import React, { useEffect, useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    useWindowDimensions,
} from "react-native";
import { Video } from "expo-av";
import axios from "axios";
import AntDesign from "@expo/vector-icons/AntDesign";

export default VideoStreaming = ({ navigation, route }) => {
    const { height, width } = useWindowDimensions();
    const [stories, setStories] = useState([]);
    const [activeStoryIndex, setActiveStoryIndex] = useState(0);
    const videoRefs = useRef([]);
    const user = route.params.user;
    // Fetch stories từ API
    const fetchStories = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.245:3000/stories-of-user?id=${user.user_id}`
            );
            setStories(response.data);
        } catch (error) {
            console.error("Error fetching stories:", error);
        }
    };

    useEffect(() => {
        fetchStories();
    }, []);

    const handlePlayPause = (index) => {
        const video = videoRefs.current[index];
        if (video) {
            video.getStatusAsync().then((status) => {
                if (status.isPlaying) {
                    video.pauseAsync();
                } else {
                    video.playAsync();
                }
            });
        }
    };

    const renderStory = ({ item, index }) => {
        const isVideo = item.url.endsWith(".mp4");
        return (
            <View style={[styles.storyContainer, { width }]}>
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        top: 60,
                        left: 20,
                        zIndex: 11,
                        flexDirection: "row",
                    }}
                    onPress={() => navigation.goBack()}
                >
                    <AntDesign name="left" size={24} color="white" />
                    <Image
                        style={{
                            height: 30,
                            width: 30,
                            borderRadius: "50%",
                            marginHorizontal: 10,
                        }}
                        resizeMode="contain"
                        source={{
                            uri:
                                item.avatar ||
                                "https://static.vecteezy.com/system/resources/previews/018/765/757/original/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg",
                        }}
                    />
                    <Text
                        style={{
                            alignSelf: "center",
                            color: "white",
                            fontSize: 18,
                        }}
                    >
                        {item.user_name}
                    </Text>
                </TouchableOpacity>

                {isVideo ? (
                    <Video
                        ref={(ref) => (videoRefs.current[index] = ref)}
                        source={{ uri: item.url }}
                        style={styles.media}
                        resizeMode="cover"
                        shouldPlay={false}
                        isLooping
                    />
                ) : (
                    <Image
                        source={{ uri: item.url }}
                        resizeMode="cover"
                        style={styles.media}
                    />
                )}
                <View style={styles.captionContainer}>
                    <Text style={styles.caption}>{item.content}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={stories}
                renderItem={renderStory}
                keyExtractor={(item) => item.id}
                horizontal // Hiển thị stories dạng ngang
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={({ viewableItems }) => {
                    if (viewableItems.length > 0) {
                        setActiveStoryIndex(viewableItems[0].index); // Cập nhật story đang hiển thị
                    }
                }}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50, // Độ hiển thị ít nhất để tính là đang được xem
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    storyContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    media: {
        width: "100%",
        height: "100%",
    },
    captionContainer: {
        position: "absolute",
        bottom: 20,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        padding: 10,
        borderRadius: 10,
        left: 10,
    },
    caption: {
        color: "white",
        fontSize: 16,
    },
});
