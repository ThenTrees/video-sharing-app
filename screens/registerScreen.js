import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
    Alert,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    // Xử lý việc chọn ảnh từ thư viện
    const handleImagePicker = async () => {
        if (Platform.OS === "web") {
            const input = document.createElement("input");
            input.type = "file";
            input.accept = "image/*";
            input.onchange = (event) => {
                const file = event.target.files[0];
                if (file) {
                    setImageUri(URL.createObjectURL(file));
                    setImageFile(file);
                }
            };
            input.click();
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                const fileExtension = result.assets[0].uri.split(".").pop(); // Lấy phần mở rộng của file
                const newFileName = `newFile.${fileExtension}`; // Tạo tên tệp mới

                console.log(newFileName);

                setImageUri(result.assets[0].uri);
                setImageFile({
                    uri: result.assets[0].uri,
                    type: "image/png", // Đảm bảo đúng loại ảnh
                    name: newFileName, // Đổi tên tệp
                });
            }
        }
    };

    // Xử lý ngày sinh
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setBirthday(date);
        hideDatePicker();
    };

    // Hàm đăng ký người dùng
    const addUser = async () => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("email", email);
        formData.append("birthday", birthday.toISOString());
        formData.append("avatar", imageFile);

        try {
            const response = await axios.post(
                "http://192.168.1.124:3000/register",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            Alert.alert("Thông báo", "Đăng ký thành công!");
            navigation.navigate("LoginScreen");
        } catch (error) {
            Alert.alert(
                "Lỗi",
                "Có lỗi xảy ra khi đăng ký: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    // Kiểm tra thông tin đăng ký
    const handleRegister = () => {
        if (!username || !password || !retryPassword || !email || !birthday) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin.");
            return;
        }
        if (password !== retryPassword) {
            Alert.alert("Lỗi", "Mật khẩu xác nhận không khớp.");
            return;
        }
        addUser();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholder="Nhap ten cua ban"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Nhập mật khẩu"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    placeholder="Xác nhận mật khẩu"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={retryPassword}
                    onChangeText={(text) => setRetryPassword(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    placeholder="Nhập email"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Birthday</Text>
                <TouchableOpacity onPress={showDatePicker} style={styles.input}>
                    <Text style={{ color: birthday ? "#000" : "#aaa" }}>
                        {birthday
                            ? birthday.toLocaleDateString()
                            : "Chọn ngày sinh"}
                    </Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>

            <TouchableOpacity
                style={styles.imagePickerButton}
                onPress={handleImagePicker}
            >
                {imageUri ? (
                    <Image
                        source={{ uri: imageUri }}
                        style={styles.previewImage}
                    />
                ) : (
                    <MaterialIcons
                        name="account-circle"
                        size={100}
                        color="#ccc"
                    />
                )}
                <Text style={styles.imagePickerText}>Chọn ảnh đại diện</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.btnRegister}
                onPress={handleRegister}
            >
                <Text style={styles.btnRegisterText}>Đăng ký</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f7f7",
        padding: 20,
        justifyContent: "center",
    },
    inputContainer: {
        marginVertical: 10,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#fff",
        padding: 15,
        borderRadius: 10,
        borderColor: "#ddd",
        borderWidth: 1,
    },
    imagePickerButton: {
        alignItems: "center",
        marginVertical: 20,
    },
    imagePickerText: {
        color: "#007AFF",
        fontSize: 16,
        fontWeight: "bold",
        marginTop: 10,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    btnRegister: {
        backgroundColor: "#007AFF",
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    btnRegisterText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },
});