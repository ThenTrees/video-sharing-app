import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
export default NavComponent = ({ navigation }) => {
    const [choose, setChoose] = useState("Home");

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    setChoose("Home");
                }}
                style={styles.element}
            >
                <AntDesign
                    name="home"
                    size={24}
                    color={choose === "Home" ? "pink" : "black"}
                />
                <Text
                    style={[
                        styles.textEl,
                        { color: choose === "Home" ? "pink" : "black" },
                    ]}
                >
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.element]}
                onPress={() => {
                    setChoose("Search");
                }}
            >
                <AntDesign
                    name="search1"
                    size={24}
                    color={choose === "Search" ? "pink" : "black"}
                />
                <Text
                    style={[
                        styles.textEl,
                        { color: choose === "Search" ? "pink" : "black" },
                    ]}
                >
                    Search
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.element}
                onPress={() => {
                    alert("Add new post");
                }}
            >
                <AntDesign name="pluscircleo" size={30} color="pink" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.element]}
                onPress={() => {
                    setChoose("Friends");
                }}
            >
                <Feather
                    name="users"
                    size={24}
                    color={choose === "Friends" ? "pink" : "black"}
                />
                <Text
                    style={[
                        styles.textEl,
                        { color: choose === "Friends" ? "pink" : "black" },
                    ]}
                >
                    Friends
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.element]}
                onPress={() => {
                    setChoose("Profile");
                }}
            >
                <Feather
                    name="user"
                    size={24}
                    color={choose === "Profile" ? "pink" : "black"}
                />
                <Text
                    style={[
                        styles.textEl,
                        { color: choose === "Profile" ? "pink" : "black" },
                    ]}
                >
                    My profile
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginVertical: 10,
    },
    element: {
        justifyContent: "center",
        alignItems: "center",
    },
    textEl: {
        color: "black",
    },
    chooseBtn: {
        color: "pink",
    },
});
