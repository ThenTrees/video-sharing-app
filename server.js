const express = require("express");
const bcrypt = require("bcrypt");
const mysql = require("mysql2");
const cors = require("cors");
const path = require("path");
const multer = require("multer");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Cho phép truy cập các file trong thư mục uploads

// Thiết lập multer để tải file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Đặt tên file
    },
});
const upload = multer({ storage }); // Tạo biến upload cho việc tải file

// Cấu hình kết nối MySQL
const db = mysql.createConnection({
    host: "localhost", // Địa chỉ server MySQL
    user: "root", // Tên người dùng MySQL
    password: "root", // Mật khẩu MySQL
    database: "videoApp", // Tên database
});
// Kết nối đến MySQL
db.connect((err) => {
    if (err) {
        console.error("Lỗi kết nối MySQL:", err);
        return;
    }
    console.log("Đã kết nối thành công tới MySQL!");
});

//API login
// API đăng nhập
app.post("/login", (req, res) => {
    // lay thong tin tu body
    const { email, password } = req.body;

    // Kiểm tra người dùng có tồn tại hay không
    const query = "SELECT * FROM users WHERE email = ?";
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ message: "Lỗi hệ thống" });
        if (results.length === 0) {
            console.log("sai tai khoan hoac mat khau");
            return res.status(404).json({
                message: "Thông tin đăng nhập không chính xác",
            });
        }
        const user = results[0];
        // So sánh mật khẩu đã mã hóa
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (isPasswordValid) {
            return res.status(200).json({ message: "Login successful", user });
        } else {
            return res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

app.post("/register", upload.single("avatar"), async (req, res) => {
    // lay thong tin tu body

    const avatar = req.file ? req.file.filename : null;

    const { username, birthday, email, password } = req.body;

    const formattedDate = birthday.toString().split("T")[0];

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Kiểm tra email đã tồn tại trong cơ sở dữ liệu chưa
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Lỗi server" });
        }
        if (results.length > 0) {
            console.log("Email đã tồn tại");
            return res.status(400).json({ message: "Email đã tồn tại" });
        }
        // Chèn người dùng mới vào cơ sở dữ liệu
        const sql =
            "INSERT INTO users ( user_name, birdth_day, avatar, email, password) VALUES (?, ?, ?, ?, ?)";
        db.query(
            sql,
            [username, formattedDate, avatar, email, hashedPassword],
            (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: "Lỗi khi đăng ký" });
                }
                res.status(201).json({ message: "Đăng ký thành công!" });
            }
        );
    });
});

app.get("/video-watching", async (req, res) => {
    try {
        const query = `
        SELECT * FROM posts p 
        JOIN users u ON p.user_id = u.id
        WHERE p.type = 'video'
        ORDER BY p.id DESC;
      `;
        db.query(query, (err, result) => {
            if (err) {
                console.log("Error fetching video details:", err);
                return res.status(500).send("Server Error");
            }
            // Send the query result as JSON response
            res.json(result);
        });
    } catch (err) {
        console.log("Unexpected error:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/is-like", async (req, res) => {
    const { post_id, user_id } = req.query;

    console.log("idPost", post_id);
    console.log("idUser", user_id);

    // Kiểm tra đầu vào (Validate input)
    if (!post_id || !user_id || isNaN(post_id) || isNaN(user_id)) {
        return res.status(400).json({
            error: "Thiếu idPost hoặc idUser hoặc giá trị không hợp lệ",
        });
    }

    try {
        // MySQL query to check if the like exists
        const query = `SELECT COUNT(*) AS is_like FROM likes WHERE post_id = ? AND user_id = ?`;

        db.query(query, [post_id, user_id], (err, results) => {
            if (err) {
                console.error("Error executing query:", err);
                return res
                    .status(500)
                    .json({ error: "Lỗi khi kiểm tra trạng thái Like." });
            }

            // Lấy giá trị is_Like (0 hoặc 1)
            const is_Like = results[0].is_like > 0;

            res.status(200).json({ is_Like });
        });
    } catch (error) {
        console.error("Lỗi kiểm tra Like:", error);
        res.status(500).json({ error: "Lỗi khi kiểm tra trạng thái Like." });
    }
});

app.post("/unlike", async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        const query = `
            DELETE FROM likes WHERE user_id = ? AND post_id = ?;
        `;

        db.query(query, [user_id, post_id], (err, results) => {
            if (err) {
                console.error("Error unliking post:", err);
                return res.status(500).send("Server error");
            }
            // If no rows were affected, meaning no like was found to delete
            if (results.affectedRows === 0) {
                return res
                    .status(400)
                    .send({ message: "No like found to remove" });
            }

            res.status(200).send({ message: "Unliked successfully" });
        });
    } catch (error) {
        console.error("Error unliking post:", error);
        res.status(500).send("Server error");
    }
});

app.post("/like", async (req, res) => {
    const { user_id, post_id } = req.body;
    try {
        const query = `INSERT INTO likes (user_id, post_id) VALUES (?, ?)`;

        db.query(query, [user_id, post_id], (err, results) => {
            if (err) {
                console.error("Error inserting like:", err);
                return res.status(500).send("Server error");
            }

            res.status(200).send({ message: "Liked successfully" });
        });
    } catch (error) {
        console.error("Error liking post:", error);
        res.status(500).send("Server error");
    }
});

// API Endpoint để lấy số lượng Like cua 1 video
app.get("/like-count", async (req, res) => {
    const { id } = req.query;

    try {
        // MySQL query to count likes for the specified post
        const query = `
            SELECT COUNT(*) AS like_count 
            FROM \`likes\` 
            WHERE post_id = ?;
        `;

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error fetching like count:", err);
                return res.status(500).send("Server Error");
            }

            console.log(`like count:::`, results[0].like_count);

            // Assuming results[0].like_count will contain the count
            const likeCount = results[0].like_count;
            res.json({ like_count: likeCount });
        });
    } catch (err) {
        console.error("Error fetching like count:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/comment-count", async (req, res) => {
    const { id } = req.query;

    try {
        // MySQL query to count likes for the specified post
        const query = `
            SELECT COUNT(*) AS comment_count 
            FROM \`comments\` 
            WHERE post_id = ?;
        `;

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error fetching like count:", err);
                return res.status(500).send("Server Error");
            }
            console.log(`comment count:::`, results[0].comment);

            // Assuming results[0].like_count will contain the count
            const commentCount = results[0].comment_count;
            res.json({ comment_count: commentCount });
        });
    } catch (err) {
        console.error("Error fetching like count:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/comments", async (req, res) => {
    const { id } = req.query;

    console.log("id", id);

    try {
        const query = `
      SELECT c.text, c.time, u.avatar, u.user_name
      FROM comments c
      INNER JOIN posts p ON c.post_id = p.id
      INNER JOIN users u ON c.user_id = u.id
      WHERE p.id = ? 
      ORDER BY c.time DESC;  
    `;

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error fetching comments:", err);
                return res.status(500).send("Server Error");
            }

            res.json(results); // results will contain the list of comments
        });
    } catch (err) {
        console.error("Error fetching comments:", err);
        res.status(500).send("Server Error");
    }
});

app.post("/insert-comment", async (req, res) => {
    const { idPost, idUser, text } = req.body;
    if (!idUser || !idPost || !text) {
        return res
            .status(400)
            .json({ error: "Vui lòng cung cấp idUser, idPost và text." });
    }

    try {
        const query = `
      INSERT INTO comments (post_id, user_id, text, time)
      VALUES (?, ?, ?, NOW());
    `;

        // Execute the query with parameters
        db.query(query, [idPost, idUser, text], (err, results) => {
            if (err) {
                console.error("Lỗi cơ sở dữ liệu:", err);
                return res.status(500).json({
                    error: "Lỗi khi thêm bình luận vào cơ sở dữ liệu.",
                });
            }

            res.status(201).json({ message: "Bình luận thành công!" });
        });
    } catch (error) {
        console.error("Lỗi khi thêm bình luận:", error);
        res.status(500).json({
            error: "Lỗi khi thêm bình luận vào cơ sở dữ liệu.",
        });
    }
});

// Khởi chạy server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
