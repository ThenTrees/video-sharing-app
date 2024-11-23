import { TouchableOpacity } from "react-native";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
    Alert,
} from "react-native";
import { useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

export default HomeScreen = ({ navigation }) => {
    const [userData, setUserData] = useState({});
    const [videos, setVideos] = useState([]);
    const [images, setImages] = useState([]);
    const [stories, setStory] = useState([]);

    const loadUserInfo = async () => {
        try {
            const data = JSON.parse(await AsyncStorage.getItem("userToken"));
            if (data) {
                setUserData(data);
            } else {
                Alert.alert("Error", "Please login first");
                navigation.navigate("Login");
            }
        } catch (e) {
            console.error("Failed to fetch data:", e);
        }
    };

    const loadDataVideos = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.198:3000/thumbnail-video`
            );
            setVideos(response.data);
        } catch (e) {
            console.error("Failed to fetch videos:", e);
            Alert.alert("Error", "Failed to fetch videos");
        }
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.198:3000/image-streaming-4`
            );
            setImages(response.data);
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    const fetchStories = async () => {
        try {
            const response = await axios.get(
                "http://192.168.1.198:3000/user-stories"
            );
            setStory(response.data);
        } catch (error) {
            console.error("Error fetching stories:", error);
            Alert.alert("Lỗi", "Không thể lấy danh sách story");
        }
    };

    useEffect(async () => {
        await loadUserInfo();
        await fetchStories();
        await loadDataVideos();
        await fetchData();
    }, []);

    // Hàm renderItem cho phần Stories
    const renderItem1 = ({ item }) => {
        const maxLength = 7;
        const displayName =
            item.user_name.length > maxLength
                ? item.user_name.slice(0, maxLength) + "..."
                : item.user_name;

        return (
            <TouchableOpacity
                style={styles.padTouch}
                onPress={() =>
                    navigation.navigate("StoryDetails", { userData: userData })
                }
            >
                <Image
                    style={{
                        height: 50,
                        width: 50,
                        borderRadius: "50%",
                        borderWidth: 3,
                        borderColor: "#0099FF",
                    }}
                    source={{ uri: item.avatar }}
                />
                <Text style={styles.username}>{displayName}</Text>
            </TouchableOpacity>
        );
    };

    // Hàm renderItem
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.padTouch, { marginLeft: item.marginLeft }]}
            onPress={() =>
                navigation.navigate("VideoStreaming", { userData: userData })
            }
        >
            <Image
                style={{
                    height: 200,
                    width: 200,
                    borderRadius: 10,
                    marginRight: 10,
                    borderWidth: 1,
                    borderColor: "#0099FF",
                }}
                source={{
                    uri:
                        item.thumbnail ||
                        "https://cdn1.vectorstock.com/i/1000x1000/76/90/not-found-rubber-stamp-vector-13537690.jpg",
                }}
            />
        </TouchableOpacity>
    );

    // Hàm renderItem cho phần audio
    const renderItem2 = ({ item }) => (
        <TouchableOpacity style={{ paddingHorizontal: 10 }}>
            <Image source={item.containerImage} />
            <Image source={item.TitleImage} />
            <Image source={item.creImage} />
        </TouchableOpacity>
    );

    // Hàm renderAnh
    const renderAnh = ({ item }) => (
        <TouchableOpacity
            style={{ padding: 10 }}
            onPress={() => {
                navigation.navigate("New Feed", { userData: userData });
            }}
        >
            <Image
                style={{
                    height: 120,
                    width: 100,
                    borderRadius: 10,
                    resizeMode: "contain",
                    borderWidth: 1,
                    borderColor: "#0099FF",
                }}
                source={{ uri: item.url }}
            />
        </TouchableOpacity>
    );
    return (
        <ScrollView
            style={styles.container}
            vertical={true}
            showsVerticalScrollIndicator={false}
        >
            {/* Story Section */}
            <SafeAreaView style={styles.listStory}>
                <TouchableOpacity
                    style={{ alignItems: "center" }}
                    onPress={() =>
                        navigation.navigate("CreateStory", {
                            userData: userData,
                        })
                    }
                >
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: "50%",
                            borderWidth: 1,
                            borderColor: "#0099FF",
                        }}
                        source={{ uri: userData.avatar }}
                    />
                    <Text>{userData.user_name}</Text>
                </TouchableOpacity>

                <FlatList
                    data={stories}
                    renderItem={renderItem1}
                    keyExtractor={(item) => item.id}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </SafeAreaView>

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
                            navigation.navigate("VideoStreaming", {
                                userData: userData,
                            })
                        }
                    >
                        <Image
                            source={require("../assets/Home_Video_Listing/Button1.png")}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={videos}
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
                        Images
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("New Feed", {
                                userData,
                            });
                        }}
                    >
                        <Image
                            source={require("../assets/Home_Video_Listing/Button1.png")}
                        />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={images}
                    renderItem={renderAnh}
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
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
        paddingHorizontal: 15,
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
});
