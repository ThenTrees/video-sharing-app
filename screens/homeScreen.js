import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import NavComponent from "../components/navComponent.js";
import Line from "../components/line.js";
import axios from "axios";
import React, { useState } from "react";

const dataTopTrending = [
    {
        id: "1",
        image: require("../assets/Home_Video_Listing/Container3.png"),
        marginLeft: -10,
    },
    {
        id: "2",
        image: require("../assets/Home_Video_Listing/Container15.png"),
        marginLeft: 0,
    },
    {
        id: "3",
        image: require("../assets/Home_Video_Listing/Container16.png"),
        marginLeft: 0,
    },
];

const dataStreaming = [
    {
        id: "1",
        image: require("../assets/Home_Video_Listing/Container11.png"),
        marginLeft: -10,
    },
    {
        id: "2",
        image: require("../assets/Home_Video_Listing/Container32.png"),
        marginLeft: 0,
    },
    {
        id: "3",
        image: require("../assets/Home_Video_Listing/Container34.png"),
        marginLeft: 0,
    },
];

const dataAudio = [
    {
        id: "1",
        containerImage: require("../assets/Home_Video_Listing/Image7.png"),
        TitleImage: require("../assets/Home_Video_Listing/Perfectlady.png"),
        creImage: require("../assets/Home_Video_Listing/Bookcase.png"),
    },
    {
        id: "2",
        containerImage: require("../assets/Home_Video_Listing/Image8.png"),
        TitleImage: require("../assets/Home_Video_Listing/Experience.png"),
        creImage: require("../assets/Home_Video_Listing/Lifestyle.png"),
    },
    {
        id: "3",
        containerImage: require("../assets/Home_Video_Listing/Image9.png"),
        TitleImage: require("../assets/Home_Video_Listing/Yourself.png"),
        creImage: require("../assets/Home_Video_Listing/Bookcase.png"),
    },
    {
        id: "4",
        containerImage: require("../assets/Home_Video_Listing/Image10.png"),
        TitleImage: require("../assets/Home_Video_Listing/Experience.png"),
        creImage: require("../assets/Home_Video_Listing/Lifestyle.png"),
    },
];

export default function HomeScreen({ navigation, route }) {
    const user = route.params.user;
    // Hàm renderItem
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.padTouch, { marginLeft: item.marginLeft }]}
            onPress={() => navigation.navigate("VideoWatchingScreen", { user })}
        >
            <Image source={item.image} />
        </TouchableOpacity>
    );

    const renderItemStream = ({ item }) => (
        <TouchableOpacity
            style={[styles.padTouch, { marginLeft: item.marginLeft }]}
            onPress={() =>
                navigation.navigate("VideoStreamingScreen", { user })
            }
        >
            <Image source={item.image} />
        </TouchableOpacity>
    );

    // Hàm renderItem cho phần audio
    const renderItem2 = ({ item }) => (
        <TouchableOpacity style={{ paddingRight: 15 }}>
            <Image source={item.containerImage} />
            <Image source={item.TitleImage} />
            <Image source={item.creImage} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {/* header */}
                <View style={styles.header}>
                    <Text style={styles.textApp}>Video Sharing App</Text>
                    <TouchableOpacity style={{ marginRight: 10 }}>
                        <Ionicons
                            name="notifications-outline"
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
                {/* line */}
                <Line />
                {/* Story Section */}
                <TouchableOpacity
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Image
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 50,
                            borderWidth: 3,
                        }}
                        source={`http://192.168.1.124:3000/uploads/${user.avatar}`}
                        resizeMode="contain"
                    />
                    <Text>{user.user_name}</Text>
                </TouchableOpacity>
                {/* Top Trending Section */}
                <SafeAreaView style={{ marginTop: 15, marginBottom: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Top trending
                        </Text>
                        <TouchableOpacity
                            onPress={() =>
                                navigation.navigate("VideoWatchingScreen", {
                                    user,
                                })
                            }
                        >
                            <Image
                                source={require("../assets/Home_Video_Listing/Button1.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={dataTopTrending}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 10 }}
                    />
                </SafeAreaView>
                {/* Browse Section */}
                <View style={{ marginTop: 25, marginBottom: 20 }}>
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        Browse topic
                    </Text>
                    <View style={[styles.viewTopic, { marginTop: 10 }]}>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container4.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container5.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container6.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container7.png")}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.viewTopic, { marginTop: 10 }]}>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container8.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container9.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container10.png")}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Container36.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* Streaming Section */}
                <SafeAreaView style={{ marginTop: 20, marginBottom: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Streaming
                        </Text>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Button1.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={dataStreaming}
                        renderItem={renderItemStream}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 10 }}
                    />
                </SafeAreaView>
                {/* Audio Section */}
                <SafeAreaView style={{ marginTop: 20, marginBottom: 20 }}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                            Audio
                        </Text>
                        <TouchableOpacity>
                            <Image
                                source={require("../assets/Home_Video_Listing/Button1.png")}
                            />
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={dataAudio}
                        renderItem={renderItem2}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ marginTop: 10 }}
                    />
                </SafeAreaView>
                {/* nav */}
                <Line />
                <NavComponent />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 30,
        paddingBottom: 20,
        paddingHorizontal: 10,
    },
    listStory: {
        paddingVertical: 15,
        flexDirection: "row",
    },
    padTouch: {
        paddingHorizontal: 10,
        alignItems: "center",
    },
    viewTopic: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    nav: {
        marginTop: 20,
        marginBottom: 12,
        paddingVertical: 15,
        paddingHorizontal: 5,
        borderTopColor: "grey",
        borderTopWidth: 0.5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    logoIcon: {
        resizeMode: "contain",
        width: 30,
    },
    textApp: {
        fontSize: 16,
        fontWeight: "bold",
        fontStyle: "italic",
        flex: 1,
        marginLeft: 10,
    },
});