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

app.get("/data", async (req, res) => {
    const id = req.query.id;
    try {
        const sql = "Select * from users where id = ?";
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }

            res.status(200).json(results[0]);
        });
    } catch (err) {
        console.log("Error fetching followed:", err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint để lấy danh sách follow
app.get("/follow", async (req, res) => {
    let id = req.query.id;

    try {
        const sql = `SELECT 
                        SUM(CASE WHEN f.id_following = ? THEN 1 ELSE 0 END) AS following_count,
                        SUM(CASE WHEN f.id_followed = ? THEN 1 ELSE 0 END) AS followers_count
                        FROM follows f
      `;

        db.query(sql, [id, id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results[0]);
        });
    } catch (err) {
        console.log("Error fetching follow counts:", err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint để lấy danh sách người đang theo dõi người dùng (followed)
app.get("/followed", async (req, res) => {
    let id = req.query.id;
    if (isNaN(id)) {
        return res
            .status(400)
            .json({ error: "Invalid ID parameter. Must be a number." });
    }
    try {
        const sql = `
        SELECT f.id_following, u.*
        FROM follows f
        JOIN users u ON u.id = f.id_following
        WHERE f.id_followed = ?
      `; // Lấy danh sách những người đang theo dõi người dùng có id = @id

        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching followed:", err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint để lấy danh sách người mà người dùng đang theo dõi (following)
app.get("/following", async (req, res) => {
    let id = req.query.id; // Lấy id người dùng

    try {
        const sql = `
        SELECT f.id_followed, u.*
        FROM follows f
        JOIN users u ON u.id = f.id_followed
        WHERE f.id_following = ?
      `; // Lấy danh sách những người mà người dùng đang theo dõi

        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching following:", err);
        res.status(500).send("Server Error");
    }
});

// Same fix applied to other routes
app.get("/profile-videos", async (req, res) => {
    let id = req.query.id;

    if (isNaN(id)) {
        return res
            .status(400)
            .json({ error: "Invalid ID parameter. Must be a number." });
    }
    try {
        const sql = `SELECT p.url,p.thumbnail, p.id as pid, u.id as uid, u.avatar FROM posts p JOIN users u
                    ON p.user_id = u.id WHERE p.type= 'video' AND p.user_id = ?
      `;

        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching profile videos:", err);
        res.status(500).send("Server Error");
    }
});

// endpoint lay danh sach anh profile
app.get("/profile-images", async (req, res) => {
    let id = req.query.id;
    if (isNaN(id)) {
        return res
            .status(400)
            .json({ error: "Invalid ID parameter. Must be a number." });
    }
    try {
        const sql = `SELECT p.url, p.id as pid, u.id as uid, u.avatar FROM posts p JOIN users u
                    ON p.user_id = u.id WHERE p.type= 'image' AND p.user_id = ?
      `;

        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching profile videos:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/video-watching", async (req, res) => {
    try {
        const sql = `
        SELECT p.id, p.type, p.url,p.content, p.upload_at, p.thumbnail, u.id as user_id,  u.user_name, u.avatar FROM posts p
        JOIN users u ON p.user_id = u.id
        where p.type = 'video'
        ORDER BY p.id DESC
      `;
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching video details:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/image-streaming-4", async (req, res) => {
    try {
        const sql = `SELECT *
                        FROM posts p
                        JOIN users u ON p.user_id = u.id
                        WHERE p.type = 'image'
                        ORDER BY p.id DESC
                        LIMIT 4
                        ;`;
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }

            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching video details:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/image-streaming", async (req, res) => {
    try {
        const sql = `
        SELECT * FROM posts p 
        INNER JOIN users u ON p.user_id = u.id
        where p.type = 'image'
        ORDER BY p.id DESC;
      `;
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching video details:", err);
        res.status(500).send("Server Error");
    }
});

// API Endpoint để lấy danh sách videoDetails
app.get("/video-details", async (req, res) => {
    const id = req.query.id;
    try {
        const sql = `select * from posts where id = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results[0]);
        });
    } catch (err) {
        console.log("Error fetching follow counts:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/comments", async (req, res) => {
    const { id } = req.query;

    try {
        const query = `
            SELECT c.id, c.text, c.time, u.avatar, u.user_name
            FROM comments c
            INNER JOIN posts p ON c.post_id = p.id
            INNER JOIN users u ON c.user_id = u.id
            WHERE p.id = ? 
            ORDER BY c.time DESC;`;

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

// API Endpoint để lấy số lượng Like cua 1 video
app.get("/like-count", async (req, res) => {
    const id = req.query.id;
    try {
        // MySQL query to count likes for the specified post
        const query = `
            SELECT COUNT(*) AS like_count 
            FROM likes
            WHERE post_id = ?;
        `;

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error fetching like count:", err);
                return res.status(500).send("Server Error");
            }

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
    const id = req.query.id;

    try {
        // MySQL query to count likes for the specified post
        const query = `
            SELECT COUNT(*) AS comment_count 
            FROM comments
            WHERE post_id = ?;
        `;

        db.query(query, [id], (err, results) => {
            if (err) {
                console.error("Error fetching like count:", err);
                return res.status(500).send("Server Error");
            }

            // Assuming results[0].like_count will contain the count
            const commentCount = results[0].comment_count;
            res.json({ comment_count: commentCount });
        });
    } catch (err) {
        console.error("Error fetching like count:", err);
        res.status(500).send("Server Error");
    }
});

// Endpoint để lưu bài viết mới
app.post("/save-post", async (req, res) => {
    const { userId, type, url, content, thumbnail } = req.body;

    console.log({ userId, type, url, content, thumbnail });

    if (!userId || !type || !url || !content) {
        return res
            .status(400)
            .json({ error: "Vui lòng cung cấp idUser, type, url và content." });
    }

    try {
        const sql = `
        INSERT INTO posts (type, url, content, upload_at, count_like, count_comment, user_id, thumbnail)
        VALUES (?, ?, ?, NOW(), 0, 0, ?,?);
      `;

        db.query(
            sql,
            [type, url, content, userId, thumbnail],
            (err, results) => {
                if (err) {
                    console.error("Lỗi cơ sở dữ liệu:", err);
                    return res.status(500).json({
                        error: "Lỗi khi lưu bài viết vào cơ sở dữ liệu.",
                    });
                }

                res.status(201).json({
                    message: "Bài viết đã được lưu thành công!",
                });
            }
        );
    } catch (error) {
        console.error("Lỗi cơ sở dữ liệu:", error);
        res.status(500).json({
            error: "Lỗi khi lưu bài viết vào cơ sở dữ liệu.",
        });
    }
});

// Update Profile Endpoint
app.put("/update-profile", async (req, res) => {
    const { idUser, username, avatar, email, birthDay } = req.body;

    const formattedDate = birthDay.toString().split("T")[0];
    if (!idUser || !username || !email || !birthDay) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const sql = `
      UPDATE users
      SET 
        user_name = ?,
        avatar = ?,
        email = ?,
        birdth_day = ?
      WHERE id = ?
    `;

        db.query(
            sql,
            [username, avatar, email, formattedDate, idUser],
            (err, results) => {
                if (err) {
                    console.error("Error updating profile:", err);
                    return res
                        .status(500)
                        .json({ message: "Internal server error" });
                }

                res.status(200).json({
                    message: "Profile updated successfully",
                });
            }
        );
    } catch (error) {
        console.error("Error updating profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Endpoint để lưu bài viết mới
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
            VALUES (?, ?, ?, NOW());`;

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

app.get("/is-following", async (req, res) => {
    const { id_following, id_followed } = req.query;

    console.log(
        `id_following: ${id_following}, id_followed: ${id_followed} is-following`
    );

    // Kiểm tra đầu vào
    if (!id_following || !id_followed) {
        return res
            .status(400)
            .json({ error: "Thiếu id_following hoặc id_followed" });
    }

    try {
        const sql = `
        SELECT COUNT(*) AS is_following
        FROM follows
        WHERE id_following = ? AND id_followed = ?
      `;
        db.query(sql, [id_following, id_followed], (err, result) => {
            if (err) {
                console.error("Lỗi kiểm tra follow:", err);
                return res
                    .status(500)
                    .json({ error: "Lỗi khi kiểm tra follow." });
            }

            // Lấy giá trị is_following (0 hoặc 1)
            const isFollowing = result[0].is_following > 0;

            res.status(200).json({ isFollowing });
        });
    } catch (error) {
        console.error("Lỗi kiểm tra follow:", error);
        res.status(500).json({ error: "Lỗi khi kiểm tra trạng thái follow." });
    }
});

// Endpoint để hủy theo dõi người dùng
app.delete("/unfollow", async (req, res) => {
    const { idFollowing, idFollowed } = req.body;
    const sql = `
          DELETE FROM follows
          WHERE id_following = ? AND id_followed = ?
      `;
    try {
        db.query(sql, [idFollowing, idFollowed], (err, results) => {
            if (err) {
                console.error("Lỗi cơ sở dữ liệu:", err);
                return res.status(500).json({
                    error: "Lỗi khi hủy theo dõi người dùng.",
                });
            }

            res.status(200).json({
                message: "Hủy theo dõi người dùng thành công",
            });
        });
    } catch (error) {
        console.error("Lỗi khi hủy theo dõi:", error);
        res.status(500).json({ error: "Lỗi khi hủy theo dõi người dùng." });
    }
});

app.get("/is-like", async (req, res) => {
    const { post_id, user_id } = req.query;
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

app.get("/stories", async (req, res) => {
    try {
        const sql = `SELECT p.id, p.type, p.url,p.content, p.upload_at, u.id as user_id,  u.user_name, u.avatar FROM posts p
                    JOIN users u ON p.user_id = u.id
                    where p.type = 'story'
                    ORDER BY p.id DESC`;

        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }

            res.status(200).json(results);
        });
    } catch (err) {
        res.status(500).send("Error fetching stories");
    }
});

app.get("/user-stories", async (req, res) => {
    try {
        const sql = `SELECT p.id,p.content,p.url, u.id as user_id, u.avatar, u.user_name, MAX(p.upload_at) AS latest_upload_at
FROM posts p JOIN users u ON p.user_id = u.id
WHERE p.type = 'story' AND TIMESTAMPDIFF(HOUR, p.upload_at, NOW()) <= 24
GROUP BY user_id, p.id
ORDER BY latest_upload_at DESC;
`;
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        res.status(500).send("Error fetching stories");
    }
});

app.get("/users", async (req, res) => {
    try {
        const sql = `SELECT * FROM users`;
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        res.status(500).send("Error fetching stories");
    }
});

//API login
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
    const { username, birthday, email, password, avatar } = req.body;

    if (!avatar) {
        avatar = "https://imgur.com/a/QdlMMTF.png";
    }
    const formattedDate = birthday.toString().split("T")[0];

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

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

app.post("/follow", async (req, res) => {
    const { idFollowing, idFollowed } = req.body;
    console.log(`id following: ${idFollowing}, id followed: ${idFollowed}`);
    try {
        const sql = `
              INSERT INTO follows (id_following, id_followed)
              VALUES (?,?)
          `;

        db.query(sql, [idFollowing, idFollowed], (err, results) => {
            if (err) {
                console.error("Lỗi cơ sở dữ liệu:", err);
                return res.status(500).json({
                    error: "Lỗi khi theo dõi người dùng.",
                });
            }

            res.status(201).json({
                message: "Đã theo dõi người dùng thành công",
            });
        });
    } catch (error) {
        console.error("Lỗi khi theo dõi:", error);
        res.status(500).json({ error: "Lỗi khi theo dõi người dùng." });
    }
});

app.get("/my-follow", async (req, res) => {
    const id = req.query.id;
    try {
        const sql = `SELECT * FROM follows WHERE id_following = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching follow counts:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/thumbnail-video", async (req, res) => {
    try {
        const sql = `SELECT p.id, p.thumbnail FROM posts p WHERE type = 'video' order by p.id desc`;
        db.query(sql, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching thumbnail counts:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/stories-of-user", async (req, res) => {
    const id = req.query.id;
    try {
        const sql = `SELECT p.id, p.type, p.url,p.content, p.upload_at, u.id as user_id,  u.user_name, u.avatar FROM posts p join users u on p.user_id = u.id where p.type = 'story' and u.id = ?`;
        db.query(sql, [id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching thumbnail counts:", err);
        res.status(500).send("Server Error");
    }
});

app.get("/user-suggest", async (req, res) => {
    const id = req.query.id;
    try {
        const sql = `SELECT u.id, u.user_name, u.avatar FROM users u WHERE u.id NOT IN (SELECT f.id_followed FROM follows f WHERE f.id_following = ?) AND u.id != ?`;
        db.query(sql, [id, id], (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Lỗi server" });
            }
            res.status(200).json(results);
        });
    } catch (err) {
        console.log("Error fetching thumbnail counts:", err);
        res.status(500).send("Server Error");
    }
});

// Khởi chạy server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
