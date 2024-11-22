import { Text, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
export default function NavComponent({ route }) {
    const navigation = useNavigation();
    const user = route?.params?.user;
    const [choose, setChoose] = useState("Home");
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => {
                    setChoose("Home");
                    navigation.navigate("HomeScreen", { user });
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
                    navigation.navigate("SearchScreen", { user });
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
                    navigation.navigate("CreateVideoFilterScreen");
                }}
            >
                <AntDesign name="pluscircleo" size={30} color="pink" />
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.element]}
                onPress={() => {
                    setChoose("Friends");
                    navigation.navigate("FriendScreen", { user });
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
                    navigation.navigate("ProfileScreen", { user });
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
}

const styles = StyleSheet.create({
    container: {
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
