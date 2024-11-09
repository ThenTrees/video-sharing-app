import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const LoginScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        if (!email || !password) {
            Alert.alert("Lỗi", "Vui lòng điền đầy đủ thông tin");
            return;
        }

        if (email === "111" && password === "111") {
            navigation.navigate("HomeScreen");
        } else {
            Alert.alert("Lỗi", "Thông tin đăng nhập không chính xác");
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
            />

            <TextInput
                style={styles.input}
                placeholder="Mật khẩu"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <TouchableOpacity style={styles.btnLogin} onPress={handleLogin}>
                <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                    Đăng nhập
                </Text>
            </TouchableOpacity>

            <View style={styles.footer}>
                <Text>Bạn chưa có tài khoản? </Text>

                <TouchableOpacity
                    onPress={() => navigation.navigate("RegisterScreen")}
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
    },
    footer: {
        marginTop: 20,
        alignItems: "center",
    },
    link: {
        color: "#0066cc",
        fontWeight: "bold",
    },
    btnLogin: {
        backgroundColor: "#0066cc",
        padding: 10,
        borderRadius: 8,
        alignItems: "center",
    },
});

export default LoginScreen;
