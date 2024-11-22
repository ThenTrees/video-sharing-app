import React, { useState } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
} from "react-native";
import axios from "axios";

export default LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState("t@gmail.com");
    const [password, setPassword] = useState("a");

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert("Lỗi", "Email không đúng định dạng");
            return;
        }

        try {
            const response = await axios.post(
                "http://192.168.1.124:3000/login",
                {
                    email,
                    password,
                }
            );
            if (response.status === 200 && response.data.user) {
                Alert.alert("Thành công", "Đăng nhập thành công!");
                setEmail("");
                setPassword("");
                navigation.navigate("VideoSharingApp", {
                    userData: response.data.user,
                });
            }
        } catch (error) {
            Alert.alert(
                "Lỗi",
                "Có lỗi xảy ra khi dang nhap: " + error.response?.data?.message
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Đăng nhập</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text style={styles.btnText}>Đăng nhập</Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Bạn chưa có tài khoản? </Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text style={styles.link}>Đăng ký ngay</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f9f9f9",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        textAlign: "center",
    },
    input: {
        height: 50,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingLeft: 10,
        marginBottom: 15,
        backgroundColor: "#fff",
    },
    btnLogin: {
        backgroundColor: "#0066cc",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    btnText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },
    link: {
        color: "#0066cc",
        fontWeight: "bold",
    },
});
