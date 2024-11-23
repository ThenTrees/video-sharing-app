import { Alert, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Following = ({ idUser, myData }) => {
    const navigation = useNavigation();
    const [followed, setFollowed] = useState([]);
    const click = ({ user, my }) => {
        navigation.navigate("ProfileDetails", { user, my });
    };
    const fetchData = async (idUser) => {
        try {
            const response = await axios.get(
                `http://192.168.1.198:3000/followed?id=${idUser}`
            );
            setFollowed(response.data); // ai follow minh
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };
    useEffect(() => {
        if (idUser) {
            fetchData(idUser);
        }
    }, [idUser]);
    return (
        <FlatList
            data={followed}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.cardPeople}
                    onPress={() => click({ user: item, my: myData })}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            source={{ uri: item.avatar }}
                            style={{ height: 50, width: 50, borderRadius: 50 }}
                        />
                        <Text style={{ marginLeft: 20, fontSize: 20 }}>
                            {item.user_name}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.3,
                            borderColor: "black",
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text>Following</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
                width: "100%",
                paddingHorizontal: 10,
                marginTop: 30,
                flex: 1,
            }}
        />
    );
};

const Followed = ({ idUser, myData }) => {
    const navigation = useNavigation();
    const [followed, setFollowed] = useState([]);
    const click = ({ user, my }) => {
        navigation.navigate("ProfileDetails", { user, my });
    };
    const fetchData = async (idUser) => {
        try {
            const response = await axios.get(
                `http://192.168.1.198:3000/following?id=${idUser}`
            );

            setFollowed(response.data); // minh follow ai
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
        }
    };

    useEffect(() => {
        if (idUser) {
            fetchData(idUser);
        }
    }, [idUser]);
    return (
        <FlatList
            data={followed}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.cardPeople}
                    onPress={() => click({ user: item, my: myData })}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            source={{ uri: item.avatar }}
                            style={{ height: 50, width: 50, borderRadius: 50 }}
                        />
                        <Text style={{ marginLeft: 20, fontSize: 20 }}>
                            {item.user_name}
                        </Text>
                    </View>
                    <View
                        style={{
                            borderWidth: 0.3,
                            borderColor: "black",
                            padding: 10,
                            borderRadius: 10,
                        }}
                    >
                        <Text>Following</Text>
                    </View>
                </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{
                width: "100%",
                paddingHorizontal: 10,
                marginTop: 30,
                flex: 1,
            }}
        />
    );
};

const widthScreen = Dimensions.get("window").width;

const MyVideosTabView = ({ userData }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "following", title: "Follower" },
        { key: "followed", title: "Đã Follow" },
    ]);

    const renderScene = SceneMap({
        following: () => <Following idUser={userData.id} myData={userData} />,
        followed: () => <Followed idUser={userData.id} myData={userData} />,
    });

    const renderTabBar = (props) => (
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
    );

    return (
        <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={{ width: widthScreen }}
            key={index}
        />
    );
};

export default FollowingScreen = ({ navigation }) => {
    const [users, setUsers] = useState([]);
    const [userData, setUserData] = useState({});

    const loadUserInfo = async () => {
        try {
            const info = JSON.parse(await AsyncStorage.getItem("userToken"));
            if (info) {
                setUserData(info);
                try {
                    const response = await axios.get(
                        `http://192.168.1.198:3000/user-suggest?id=${info.id}`
                    );
                    setUsers(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                    Alert.alert("Lỗi", "Không thể lấy danh sách user");
                }
            } else {
                Alert.alert("Error", "Please login first");
                navigation.navigate("Login");
            }
        } catch (e) {
            console.error("Failed to fetch data:", e);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <View style={styles.leftHead}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            padding: 10,
                        }}
                    >
                        <Icon2 name="angle-left" size={30} color="black" />
                    </TouchableOpacity>
                    <Image
                        style={{
                            height: 50,
                            width: 50,
                            borderRadius: 50,
                            marginHorizontal: 10,
                        }}
                        source={{ uri: userData.avatar }}
                    />
                    <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                        {userData.user_name}
                    </Text>
                </View>
                <View style={styles.leftHead}>
                    <TouchableOpacity>
                        <Icon2
                            style={{ paddingHorizontal: 5 }}
                            name="search"
                            size={20}
                            color="black"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Icon2
                            style={{ paddingHorizontal: 5 }}
                            name="bars"
                            size={20}
                            color="black"
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <MyVideosTabView userData={userData} />
            <View style={{ marginBottom: 20, height: 300 }}>
                <Text style={{ backgroundColor: "#E8E8E8", padding: 10 }}>
                    Suggestion for you
                </Text>
                <FlatList
                    data={users}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.cardPeople}
                            onPress={() => {
                                navigation.navigate("ProfileDetails", {
                                    user: item,
                                    my: userData,
                                });
                            }}
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                }}
                            >
                                <Image
                                    source={{ uri: item.avatar }}
                                    style={{ height: 50, width: 50 }}
                                />
                                <Text style={{ marginLeft: 10 }}>
                                    {item.user_name}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                    borderRadius: 10,
                                    backgroundColor: "#00BFFF",
                                }}
                            >
                                <Text style={{ color: "white" }}>Follow</Text>
                            </TouchableOpacity>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={{
                        width: "100%",
                        paddingHorizontal: 10,
                        marginTop: 30,
                    }}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 50,
    },
    head: {
        paddingHorizontal: 10,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    leftHead: {
        flexDirection: "row",
        alignItems: "center",
    },
    scene: {
        height: 200,
    },
    tabBar: {
        backgroundColor: "white",
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    indicator: {
        backgroundColor: "pink",
        height: 2,
    },
    tabLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    activeTabLabel: {
        color: "pink",
    },
    inactiveTabLabel: {
        color: "gray",
    },
    cardPeople: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
    },
});
