import React, { useEffect, useState } from "react";
import {
    Dimensions,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";

const widthScreen = Dimensions.get("window").width;

const ProfileScreen = ({ navigation }) => {
    const [dataFL, setDataFL] = useState({});
    const [userData, setUserData] = useState({});

    const MyVideos = ({ id, navigation }) => {
        const [videos, setVideos] = useState([]);

        const fetchDataVideo = async (id) => {
            try {
                const response = await axios.get(
                    `http://192.168.1.245:3000/profile-videos?id=${id}`
                );
                setVideos(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                Alert.alert("Error", "Failed to fetch videos.");
                setVideos([]);
            }
        };

        useEffect(() => {
            if (id) {
                fetchDataVideo(id);
            }
        }, [id]);

        if (videos.length === 0) {
            return (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text>No videos available.</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={videos}
                keyExtractor={(item, index) => `${item.pid}-${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.videoItem}
                        onPress={() =>
                            navigation.navigate("VideoDetails", {
                                idPost: item.pid,
                                idUser: item.uid,
                                avatar: item.avatar,
                            })
                        }
                    >
                        <Image
                            style={styles.thumbnail}
                            source={{
                                uri:
                                    item.thumbnail ||
                                    "https://via.placeholder.com/150",
                            }}
                        />
                    </TouchableOpacity>
                )}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
            />
        );
    };

    const MyImages = ({ id, navigation }) => {
        const [images, setImages] = useState([]);

        const fetchDataImage = async (id) => {
            try {
                const response = await axios.get(
                    `http://192.168.1.245:3000/profile-images?id=${id}`
                );
                setImages(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                Alert.alert("Error", "Failed to fetch images.");
                setImages([]);
            }
        };

        useEffect(() => {
            if (id) {
                fetchDataImage(id);
            }
        }, [id]);

        if (images.length === 0) {
            return (
                <View style={{ alignItems: "center", marginTop: 20 }}>
                    <Text>No images available.</Text>
                </View>
            );
        }

        return (
            <FlatList
                data={images}
                keyExtractor={(item, index) => `${item.pid}_${index}`}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.videoItem}
                        onPress={() =>
                            navigation.navigate("ImageView", {
                                imageUrl: item.url,
                            })
                        }
                    >
                        <Image
                            style={styles.thumbnail}
                            source={{ uri: item.url }}
                        />
                    </TouchableOpacity>
                )}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
            />
        );
    };

    const MyLiked = () => {
        const likedVideos = [
            { id: "1", image: require("../assets/MyProfile/Container72.png") },
            { id: "2", image: require("../assets/MyProfile/Container73.png") },
            { id: "3", image: require("../assets/MyProfile/Container74.png") },
            { id: "4", image: require("../assets/MyProfile/Container75.png") },
        ];

        return (
            <FlatList
                data={likedVideos}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.videoItem}>
                        <Image style={styles.thumbnail} source={item.image} />
                    </TouchableOpacity>
                )}
                numColumns={3}
                contentContainerStyle={styles.flatListContainer}
            />
        );
    };

    const MyVideosTabView = ({ id }) => {
        const [index, setIndex] = useState(0);
        const [routes] = useState([
            { key: "videos", title: "My Videos" },
            { key: "images", title: "My Images" },
            { key: "liked", title: "Liked" },
        ]);

        const renderScene = SceneMap({
            videos: () => <MyVideos id={id} navigation={navigation} />,
            images: () => <MyImages id={id} navigation={navigation} />,
            liked: MyLiked,
        });

        return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                renderTabBar={(props) => (
                    <TabBar
                        {...props}
                        indicatorStyle={styles.indicator}
                        style={styles.tabBar}
                        renderLabel={({ route, focused }) => (
                            <Text
                                style={[
                                    styles.tabLabel,
                                    focused
                                        ? styles.activeTabLabel
                                        : styles.inactiveTabLabel,
                                ]}
                            >
                                {route.title}
                            </Text>
                        )}
                    />
                )}
                onIndexChange={setIndex}
                initialLayout={{ width: widthScreen }}
                lazy
            />
        );
    };

    const loadUserInfo = async () => {
        try {
            const token = await AsyncStorage.getItem("userToken");
            const info = token ? JSON.parse(token) : null;
            if (info) {
                setUserData(info);
            } else {
                navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert("Error", "Failed to load user info.");
        }
    };

    const fetchDataFL = async (id) => {
        try {
            const response = await axios.get(
                `http://192.168.1.245:3000/follow?id=${id}`
            );
            setDataFL(response.data);
        } catch (error) {
            console.error("Error fetching followers data:", error.message);
            setDataFL({});
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);

    useEffect(() => {
        if (userData.id) {
            fetchDataFL(userData.id);
        }
    }, [userData]);

    return (
        <View style={styles.container}>
            <View style={styles.imgLogo}>
                <Image
                    style={styles.profileImage}
                    source={{
                        uri:
                            userData?.avatar ||
                            "https://via.placeholder.com/150",
                    }}
                />
                <Text style={styles.profileName}>
                    {userData?.user_name ?? "Unknown User"}
                </Text>
                <View style={styles.statsContainer}>
                    <TouchableOpacity
                        style={styles.statBox}
                        onPress={() =>
                            navigation.navigate("Following", { user: userData })
                        }
                    >
                        <Text>{dataFL?.following_count ?? 0}</Text>
                        <Text style={styles.textGrey}>Following</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.statBox}
                        onPress={() =>
                            navigation.navigate("Followers", { user: userData })
                        }
                    >
                        <Text>{dataFL?.followers_count ?? 0}</Text>
                        <Text style={styles.textGrey}>Followers</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.statBox}>
                        <Text>6031</Text>
                        <Text style={styles.textGrey}>Likes</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MyVideosTabView id={userData.id} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    imgLogo: { alignItems: "center", marginTop: 30 },
    profileImage: { height: 150, width: 150, borderRadius: 75 },
    profileName: { fontSize: 24, fontWeight: "bold", marginVertical: 10 },
    statsContainer: { flexDirection: "row", marginTop: 20 },
    statBox: { paddingHorizontal: 15, alignItems: "center" },
    textGrey: { color: "grey" },
    videoItem: { width: widthScreen / 3 - 10, margin: 5, height: 180 },
    thumbnail: { height: "100%", width: "100%", borderRadius: 10 },
    flatListContainer: { marginTop: 10, alignItems: "center" },
    tabBar: {
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    indicator: { backgroundColor: "black" },
    tabLabel: { fontSize: 14 },
    activeTabLabel: { color: "black" },
    inactiveTabLabel: { color: "grey" },
});

export default ProfileScreen;
