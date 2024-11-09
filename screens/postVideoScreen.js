import React, { useState } from "react";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { View, StyleSheet, Image, Dimensions, ScrollView } from "react-native";
import { TextInput, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Line from "../components/line";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
export default PostVideoScreen = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => navigation.goBack()}
                    >
                        <Ionicons name="chevron-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text style={{ fontWeight: "600", fontSize: 18, flex: 1 }}>
                        Post on social
                    </Text>
                    <Text
                        style={{ color: "pink", marginRight: 10, fontSize: 16 }}
                    >
                        Review
                    </Text>
                </View>
                <Line />
                <View style={styles.imageContainer}>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Image56.png")}
                        style={styles.image}
                        resizeMode="contain"
                    />
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/CreateVideoPostVideo/Button16.png")}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Title</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Input title"
                        placeholderTextColor="rgba(0, 0, 0, 0.2)"
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Description</Text>
                    <TextInput
                        style={[styles.input, { height: 100 }]}
                        placeholder="Input description"
                        placeholderTextColor="rgba(0, 0, 0, 0.2)"
                        multiline
                    />
                </View>

                <View style={styles.itemContainer1}>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Addhashtag.png")}
                    />
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Tag5.png")}
                    />
                </View>

                <View style={styles.itemContainer2}>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Tagsomeone.png")}
                    />
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Tag6.png")}
                    />
                </View>

                <View style={styles.itemContainer3}>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Comments.png")}
                    />
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Switch1.png")}
                    />
                </View>

                <View style={styles.itemContainer3}>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Whocanwatch.png")}
                    />
                    <Image
                        source={require("../assets/CreateVideoPostVideo/DropdownButton1.png")}
                    />
                </View>

                <View style={styles.itemContainer1}>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Alsoposton.png")}
                    />
                </View>

                <View style={styles.itemContainer3}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Entypo
                            name="facebook-with-circle"
                            size={24}
                            color="black"
                        />
                        <Image
                            source={require("../assets/CreateVideoPostVideo/Facebook.png")}
                        />
                    </View>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Switch2.png")}
                    />
                </View>

                <View style={styles.itemContainer3}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Entypo
                            name="twitter-with-circle"
                            size={24}
                            color="black"
                        />
                        <Image
                            source={require("../assets/CreateVideoPostVideo/Twitter.png")}
                        />
                    </View>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Switch3.png")}
                    />
                </View>

                <View style={styles.itemContainer3}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Entypo
                            name="instagram-with-circle"
                            size={24}
                            color="black"
                        />
                        <Image
                            source={require("../assets/CreateVideoPostVideo/Instagram.png")}
                        />
                    </View>
                    <Image
                        source={require("../assets/CreateVideoPostVideo/Switch4.png")}
                    />
                </View>
                <View style={styles.itemContainer3}>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/CreateVideoPostVideo/Button17.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/CreateVideoPostVideo/Button18.png")}
                        />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 30,
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    image: {
        width: "100%",
        aspectRatio: 1,
    },
    inputContainer: {
        marginBottom: 30,
        paddingHorizontal: 20,
        marginTop: -10,
    },
    inputLabel: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
    },
    input: {
        // height: 40,
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#F5F5F5",
    },
    itemContainer1: {
        marginBottom: 20,
        paddingHorizontal: 10,
    },
    itemContainer2: {
        flexDirection: "row",
        marginBottom: 20,
        paddingHorizontal: 10,
        alignItems: "center",
    },
    itemContainer3: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20,
        paddingHorizontal: 10,
        alignItems: "center",
    },
});
