import React, { useRef, useState, useEffect } from "react";
import {
    View,
    StyleSheet,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    useWindowDimensions,
    Modal,
    TextInput,
    Alert,
} from "react-native";
import { Video } from "expo-av";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";
import Icon2 from "react-native-vector-icons/FontAwesome";
import Icon3 from "react-native-vector-icons/EvilIcons";

export default VideoStreaming = ({ navigation, route }) => {
    const videoRefs = useRef([]);
    const [activePosId, setActivePostId] = useState(null);
    const { height } = useWindowDimensions();
    const [likedPosts, setLikedPosts] = useState({});
    const [videos, setVideos] = useState([]);
    const [comments, setComments] = useState([]);
    const [isCommentsVisible, setCommentsVisible] = useState(false);
    const [currentVideoData, setCurrentVideoData] = useState({
        likeCount: 0,
        commentCount: 0,
    });

    const user = route.params.userData;
    const my = user;

    const getRelativeTime = (uploadAt) => {
        const now = new Date();
        // Lùi lại 7 giờ
        now.setHours(now.getHours() - 7);

        const uploadedDate = new Date(uploadAt);
        const diffInSeconds = Math.floor((now - uploadedDate) / 1000);

        if (diffInSeconds < 60) return `${diffInSeconds} seconds ago`;
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} minutes ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} hours ago`;
        return `${Math.floor(diffInSeconds / 86400)} days ago`;
    };

    const fetchData = async () => {
        try {
            const response = await axios.get(
                `http://192.168.1.245:3000/video-watching`
            );
            setVideos(response.data);
            setActivePostId(response.data[0].id);
            updateCurrentVideoData(response.data[0].id);
            // Check like status for all videos
            const likeStatuses = {};
            for (const video of response.data) {
                const res = await axios.get(
                    "http://192.168.1.245:3000/is-like",
                    {
                        params: {
                            post_id: video.id,
                            user_id: user.id,
                        },
                    }
                );
                likeStatuses[video.id] = res.data.is_Like;
            }
            setLikedPosts(likeStatuses);
        } catch (error) {
            console.error("Error fetching video data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (activePosId) {
            checkIsLike(activePosId, user.id);
        }
    }, [activePosId]);

    useEffect(() => {
        if (likedPosts[activePosId] !== undefined) {
            setCurrentVideoData((prev) => ({
                ...prev,
                is_like: likedPosts[activePosId],
            }));
        }
    }, [likedPosts, activePosId]);

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

    const toggleLike = async (post_id) => {
        try {
            const isCurrentlyLiked = likedPosts[post_id];
            const url = isCurrentlyLiked
                ? `http://192.168.1.245:3000/unlike`
                : `http://192.168.1.245:3000/like`;

            const response = await axios.post(url, {
                user_id: user.id,
                post_id: post_id,
            });

            if (response.status === 200) {
                setLikedPosts((prev) => ({
                    ...prev,
                    [post_id]: !isCurrentlyLiked,
                }));
                setCurrentVideoData((prev) => ({
                    ...prev,
                    likeCount: isCurrentlyLiked
                        ? prev.likeCount - 1
                        : prev.likeCount + 1,
                }));
            } else {
                Alert.alert("Lỗi", "Không thể cập nhật trạng thái 'like'.");
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            Alert.alert("Lỗi", "Đã xảy ra lỗi khi xử lý yêu cầu 'like'.");
        }
    };

    const handleViewableItemsChanged = ({ viewableItems }) => {
        if (viewableItems.length > 0) {
            const newActivePostId = viewableItems[0].item.id;
            setActivePostId(newActivePostId);

            // Cập nhật thông tin video hiện tại
            updateCurrentVideoData(newActivePostId);
            videoRefs.current.forEach((video, index) => {
                if (video) {
                    if (videos[index].id === newActivePostId) {
                        video.playAsync();
                    } else {
                        video.pauseAsync();
                    }
                }
            });
        }
    };
    const [isLike, setIsLike] = useState(false);
    const checkIsLike = async (post_id, user_id) => {
        try {
            const response = await axios.get(
                "http://192.168.1.245:3000/is-like",
                {
                    params: { post_id, user_id },
                }
            );

            if (response.status === 200) {
                setLikedPosts((prev) => ({
                    ...prev,
                    [post_id]: response.data.is_like,
                }));
            }
        } catch (error) {
            console.error("Error checking like status:", error);
        }
    };

    const updateCurrentVideoData = async (idPost) => {
        try {
            const [likeResponse, commentResponse] = await Promise.all([
                axios.get(`http://192.168.1.245:3000/like-count?id=${idPost}`),
                axios.get(
                    `http://192.168.1.245:3000/comment-count?id=${idPost}`
                ),
            ]);

            setCurrentVideoData({
                likeCount: likeResponse.data?.like_count || 0,
                commentCount: commentResponse.data?.comment_count || 0,
                is_like: isLike,
            });
        } catch (error) {
            console.error("Error updating video data:", error);
        }
    };

    const renderVideo = ({ item, index }) => (
        <View style={[styles.videoContainer, { height }]}>
            <TouchableOpacity onPress={() => handlePlayPause(index)}>
                <Video
                    ref={(ref) => (videoRefs.current[index] = ref)}
                    source={{ uri: item.url }}
                    style={styles.video}
                    resizeMode="contain"
                    shouldPlay={item.id === activePosId}
                    isLooping
                />
            </TouchableOpacity>
            <View style={styles.boxIcon}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ProfileDetails", {
                            user: item,
                            my: my,
                        })
                    }
                >
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            marginBottom: 10,
                        }}
                        source={{ uri: item.avatar }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleLike(item.id)}>
                    <Icon2
                        style={styles.iconRight}
                        name={likedPosts[item.id] ? "heart-o" : "heart-o"}
                        size={30}
                        color={likedPosts[item.id] ? "red" : "white"}
                    />
                    <Text style={styles.count}>
                        {item.id === activePosId
                            ? currentVideoData.likeCount
                            : 0}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => fetchComments(item.id)}>
                    <Icon2
                        style={styles.iconRight}
                        name="comment-o"
                        size={30}
                        color="white"
                    />
                    <Text style={styles.count}>
                        {item.id === activePosId
                            ? currentVideoData.commentCount
                            : 0}
                    </Text>
                </TouchableOpacity>
                <Icon2
                    style={styles.iconRight}
                    name="bookmark-o"
                    size={30}
                    color="white"
                />
            </View>
            <View style={styles.boxName}>
                <Text
                    style={{ color: "white", fontSize: 24, fontWeight: "bold" }}
                >
                    {item.user_name}
                </Text>
            </View>
            <View style={styles.boxTitle}>
                <Text style={{ color: "white", fontSize: 18 }}>
                    {item.content}
                </Text>
            </View>
            <View style={styles.music}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Icon2
                        style={{ paddingRight: 30 }}
                        name="music"
                        size={30}
                        color="white"
                    />
                    <Text style={{ color: "white", fontSize: 16 }}>
                        Music on Video
                    </Text>
                </View>
                <Icon2 name="navicon" size={30} color="white" />
            </View>
        </View>
    );

    const fetchComments = async (post_id) => {
        try {
            const response = await axios.get(
                `http://192.168.1.245:3000/comments?id=${post_id}`
            );
            if (response.status === 200) {
                setComments(response.data);
                setCommentsVisible(true);
            } else {
                Alert.alert(
                    "Lỗi",
                    "Không thể lấy bình luận. Vui lòng thử lại sau."
                );
            }
        } catch (error) {
            console.error("Error fetching comments:", error);
            Alert.alert(
                "Lỗi",
                "Đã có lỗi xảy ra trong quá trình lấy bình luận."
            );
        }
    };

    const insertComment = async (idUser, idPost, text) => {
        try {
            const response = await axios.post(
                "http://192.168.1.245:3000/insert-comment",
                {
                    idUser,
                    idPost,
                    text,
                }
            );

            if (response.status === 201) {
                Alert.alert("Thành công", "Đã bình luận thành công!");
                updateCurrentVideoData(idPost);
                fetchComments(idPost);
                setNewComment("");
            } else {
                Alert.alert(
                    "Lỗi",
                    "Đã xảy ra lỗi khi bình luận vào cơ sở dữ liệu."
                );
            }
        } catch (error) {
            console.error("Lỗi khi gọi API:", error);
            Alert.alert("Lỗi", "Không thể kết nối tới máy chủ.");
        }
    };

    const BL = ({ idPost, text }) => {
        insertComment(user.id, idPost, text);
    };

    const [newComment, setNewComment] = useState("");

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.backButton}
                onPress={() => navigation.goBack()}
            >
                <Icon name="chevron-thin-left" size={30} color="white" />
            </TouchableOpacity>
            <FlatList
                data={videos}
                renderItem={renderVideo}
                keyExtractor={(item) => item.id}
                onViewableItemsChanged={handleViewableItemsChanged}
                viewabilityConfig={{
                    itemVisiblePercentThreshold: 50,
                }}
                pagingEnabled
                showsVerticalScrollIndicator={false}
            />
            <Modal
                animationType="slide"
                transparent={true}
                visible={isCommentsVisible}
                onRequestClose={() => {
                    setCommentsVisible(false);
                    setNewComment("");
                }}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Bình luận</Text>
                        <TouchableOpacity>
                            <Icon3
                                style={styles.close}
                                name="close"
                                size={30}
                                color="black"
                                onPress={() => setCommentsVisible(false)}
                            />
                        </TouchableOpacity>

                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                placeholder="Thêm bình luận..."
                                placeholderTextColor="#888"
                                value={newComment}
                                onChangeText={setNewComment}
                            />
                            <Icon2
                                name="paper-plane"
                                size={20}
                                color="pink"
                                onPress={() =>
                                    BL({
                                        idPost: activePosId,
                                        text: newComment,
                                    })
                                }
                            />
                        </View>

                        <FlatList
                            data={comments}
                            keyExtractor={(comment) => comment.time}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        padding: 5,
                                        alignItems: "center",
                                        flex: 1,
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <TouchableOpacity
                                            onPress={() => {
                                                setCommentsVisible(false);
                                                navigation.navigate(
                                                    "ProfileDetails",
                                                    { user: item, my: my }
                                                );
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.avatar }}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    borderRadius: 50,
                                                    borderWidth: 1,
                                                    borderColor: "pink",
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <View style={{ paddingLeft: 10 }}>
                                            <Text
                                                style={{
                                                    fontSize: 11,
                                                    color: "gray",
                                                    marginTop: -8,
                                                    marginBottom: 5,
                                                }}
                                            >
                                                {getRelativeTime(item.time)}
                                            </Text>
                                            <Text
                                                style={[
                                                    styles.commentText,
                                                    { fontWeight: "bold" },
                                                ]}
                                            >
                                                {item.user_name}
                                            </Text>

                                            <Text style={styles.commentText}>
                                                {item.text}
                                            </Text>
                                        </View>
                                    </View>
                                    <Icon2
                                        name="heart-o"
                                        size={20}
                                        color="gray"
                                    />
                                </View>
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black",
    },
    backButton: {
        position: "absolute",
        top: 80,
        left: 10,
        zIndex: 11,
    },
    videoContainer: {
        width: "100%",
        position: "relative",
    },
    video: {
        width: "100%",
        height: "100%",
    },
    boxIcon: {
        position: "absolute",
        bottom: 60,
        right: 20,
        alignItems: "center",
    },
    iconRight: {
        paddingVertical: 20,
    },
    boxTitle: {
        position: "absolute",
        bottom: 60,
        left: 20,
    },
    boxName: {
        position: "absolute",
        bottom: 80,
        left: 20,
    },
    music: {
        flexDirection: "row",
        width: "100%",
        position: "absolute",
        bottom: 20,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 25,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        position: "relative",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "100%",
        height: "60%",
        position: "absolute",
        bottom: 0,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    commentText: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        paddingHorizontal: 8,
        flex: 1,
        backgroundColor: "#eee",
        borderRadius: 10,
        marginBottom: 10,
        marginRight: 10,
    },
    close: {
        position: "absolute",
        right: 0,
        top: -40,
    },
    count: {
        color: "white",
        position: "absolute",
        alignSelf: "center",
        backgroundColor: "transparent",
        bottom: 2,
        fontSize: 18,
        // backgroundColor: 'black'
    },
});
