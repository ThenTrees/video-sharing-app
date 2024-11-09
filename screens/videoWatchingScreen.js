import React, { useRef, useState } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Dimensions,
    SafeAreaView,
    useWindowDimensions,
} from "react-native";
import { Video } from "expo-av";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
const post = [
    {
        id: "1",
        video: "https://imgur.com/fg0Dwnr.mp4",
        caption: "I can fix that",
        hagtag: "#movie, #cypher105",
        music: "afterhours - the Weeknd",
    },
    {
        id: "2",
        video: "https://imgur.com/3sctqTx.mp4",
        caption: "I can fix that",
        hagtag: "#movie, #cypher105",
        music: "afterhours - the Weeknd",
    },
];

export default function VideoWatchingScreen({ navigation }) {
    const videoRefs = useRef([]);
    const [activePosId, setActivePostId] = useState(post[0].id);

    const [likedPosts, setLikedPosts] = useState({});

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
    const toggleLike = (id) => {
        setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newActivePostId = viewableItems[0].item.id;
            setActivePostId(newActivePostId);
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    if (post[index].id === newActivePostId) {
                        video.playAsync();
                    } else {
                        video.pauseAsync();
                    }
                }
            });
        }
    };

    const height = useWindowDimensions().height;

    const renderVideo = ({ item, index }) => (
        <SafeAreaView style={{ height }}>
            <TouchableOpacity onPress={() => handlePlayPause(index)}>
                <Video
                    ref={(ref) => (videoRefs.current[index] = ref)}
                    rate={1.0}
                    volume={1.0}
                    source={{ uri: item.video }}
                    style={{ width: "100%", height: height }}
                    resizeMode="contain"
                    shouldPlay={item.id === activePosId}
                    isLooping
                />
            </TouchableOpacity>
            <View style={styles.footerVideo}>
                <View style={styles.boxTitle}>
                    <Text style={{ color: "white", fontSize: 18, padding: 5 }}>
                        {item.caption}
                    </Text>
                    <Text style={{ color: "white", fontSize: 14, padding: 5 }}>
                        {item.hagtag}
                    </Text>
                    <View style={styles.music}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Icon2
                                style={{ paddingRight: 30 }}
                                name="music"
                                size={30}
                                color="white"
                            />
                            <Text style={{ color: "white", fontSize: 16 }}>
                                {item.music}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.boxIcon}>
                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => toggleLike(item.id)}
                    >
                        <Icon2
                            name="heart-o"
                            size={30}
                            color={likedPosts[item.id] ? "red" : "white"}
                        />
                    </TouchableOpacity>
                    <Text style={{ color: "#fff" }}>19.6K</Text>
                    <TouchableOpacity style={{ padding: 10 }}>
                        <Icon2 name="comment-o" size={30} color="white" />
                    </TouchableOpacity>
                    <Text style={{ color: "#fff" }}>700</Text>
                    <TouchableOpacity
                        onPress={() => alert("height:  " + height)}
                        style={{ padding: 10, marginTop: 10 }}
                    >
                        <Entypo
                            name="dots-three-horizontal"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: "pink",
                position: "relative",
                height: height,
            }}
        >
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <AntDesign name="close" size={24} color="#fff" />
            </TouchableOpacity>
            <FlatList
                data={post}
                renderItem={renderVideo}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                pagingEnabled
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    backButton: {
        position: "absolute",
        top: 30,
        right: 20,
        padding: 10,
        zIndex: 2,
    },
    boxIcon: {
        alignItems: "center",
        borderWidth: 1,
        borderColor: "white",
    },
    music: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
    footerVideo: {
        flexDirection: "row",
        position: "absolute",
        top: 700,
        left: 10,
        alignItems: "flex-end",
        gap: 150,
        zIndex: 2,
    },
});
