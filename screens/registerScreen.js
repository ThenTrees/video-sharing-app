import {
    SafeAreaView,
    StyleSheet,
    TextInput,
    View,
    Text,
    TouchableOpacity,
    Image,
    Platform,
} from "react-native";
import { useState } from "react";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default RegisterScreen = ({ navigation }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retryPassword, setRetryPassword] = useState("");
    const [imageUri, setImageUri] = useState(null);
    const [imageFile, setImageFile] = useState(null);

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
                setImageUri(result.assets[0].uri);
                setImageFile({
                    uri: result.assets[0].uri,
                    type: "image/png",
                    name: "avatar.png",
                });
            }
        }
    };

    const addUser = async () => {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        formData.append("avatar", imageFile);

        try {
            const response = await axios.post(
                "http://localhost:3000/user/register",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            alert("User added successfully");
            navigation.navigate("Login");
        } catch (error) {
            alert(
                "Error adding user: " +
                    (error.response?.data?.message || error.message)
            );
        }
    };

    const handleRegister = () => {
        if (username && password === retryPassword) {
            addUser();
        } else {
            alert("Password does not match");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Username</Text>
                <TextInput
                    placeholder="Enter your username"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                    placeholder="Enter your password"
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
                    placeholder="Re-enter your password"
                    placeholderTextColor="#aaa"
                    style={styles.input}
                    secureTextEntry
                    value={retryPassword}
                    onChangeText={(text) => setRetryPassword(text)}
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
                <Text style={styles.imagePickerText}>Choose Avatar</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.btnRegister}
                onPress={handleRegister}
            >
                <Text style={styles.btnRegisterText}>Register</Text>
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
