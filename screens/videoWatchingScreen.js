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
    Modal,
    Image,
    TextInput,
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

const dataComment = [
    {
        id: "1",
        name: "Laura",
        avatar: require("../assets/VideoStreaming/Avatar23.png"),
        comment: "So cute, I wish my cat was like that",
        time: "6 mins ago",
    },
    {
        id: "2",
        name: "Lauren",
        avatar: require("../assets/VideoStreaming/Avatar23.png"),
        comment: "Look at her, as if 'mom, i want food' ",
        time: "20 mins ago",
    },
    {
        id: "3",
        name: "Liz",
        avatar: require("../assets/VideoStreaming/Avatar23.png"),
        comment:
            "My cat also often wait for me to come home from work in front of the door hehe",
        time: "30 mins ago",
    },
    {
        id: "4",
        name: "Anne",
        avatar: require("../assets/VideoStreaming/Avatar23.png"),
        comment: "Awwwwwwwwww",
        time: "30 mins ago",
    },
    {
        id: "5",
        name: "Larry",
        avatar: require("../assets/VideoStreaming/Avatar23.png"),
        comment: "I want to cuddle",
        time: "20 mins ago",
    },
];

export default function VideoWatchingScreen({ navigation }) {
    const videoRefs = useRef([]);
    const [activePosId, setActivePostId] = useState(post[0].id);
    const [likedPosts, setLikedPosts] = useState({});
    const [modalVisible, setModalVisible] = useState(false);

    const renderComment = ({ item }) => {
        return (
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    paddingVertical: 10,
                    zIndex: 2,
                }}
            >
                <Image source={item.avatar} reSizeMode="contain" />
                <View style={{ marginLeft: 10, flex: 1 }}>
                    <Text style={{ color: "#000", fontWeight: "600" }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: "#333", fontWeight: "500" }}>
                        {item.comment}
                    </Text>
                    <Text style={{ color: "#ddd", fontWeight: "500" }}>
                        {item.time}
                    </Text>
                </View>
                <TouchableOpacity>
                    <Entypo name="heart-outlined" size={24} color="black" />
                </TouchableOpacity>
            </View>
        );
    };

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
        <View
            style={{
                width: "100%",
                height,
            }}
        >
            <TouchableOpacity onPress={() => handlePlayPause(index)}>
                <Video
                    ref={(ref) => (videoRefs.current[index] = ref)}
                    rate={1.0}
                    volume={1.0}
                    source={{ uri: item.video }}
                    style={{ width: "100%", height: "100%" }}
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
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                        }}
                        style={{ padding: 10 }}
                    >
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
        </View>
    );

    return (
        <SafeAreaView
            style={{
                flex: 1,
                position: "relative",
                backgroundColor: "black",
                paddingVertical: 25,
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>
                                700 comments
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                }}
                            >
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                        {/* list comment */}
                        <View>
                            <FlatList
                                data={dataComment}
                                renderItem={renderComment}
                                keyExtractor={(item) => item.id}
                                contentContainerStyle={styles.listFilter}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                placeholder="Leave comment ..."
                                placeholderTextColor="#caced5"
                                style={{
                                    backgroundColor: "#f3f4f6",
                                    borderRadius: 10,
                                    padding: 10,
                                    marginVertical: 10,
                                    fontSize: 16,
                                    flex: 1,
                                    marginRight: 10,
                                }}
                            />
                            <TouchableOpacity>
                                <Entypo
                                    name="paper-plane"
                                    size={24}
                                    color="pink"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        height: "60%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
    },

    listFilter: {
        paddingVertical: 20,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
