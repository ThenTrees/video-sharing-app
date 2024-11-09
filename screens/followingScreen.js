import {
    Alert,
    Dimensions,
    FlatList,
    SafeAreaView,
    TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Icon2 from "react-native-vector-icons/FontAwesome";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { useState } from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";

const MyVideos = () => {
    const navigation = useNavigation();
    const click = ({ id }) => {
        navigation.navigate("ProfileDetailScreen", { userID: id });
    };
    return (
        <FlatList
            data={dataFollowing}
            renderItem={({ item }) => (
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 10,
                    }}
                >
                    <TouchableOpacity
                        style={styles.cardPeople}
                        onPress={() => click({ id: item.id })}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                flex: 1,
                            }}
                        >
                            <Image
                                source={item.image}
                                style={{
                                    height: 50,
                                    width: 50,
                                    marginRight: 10,
                                }}
                            />
                            <Text style={{ flex: 1 }}>{item.name}</Text>
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
                        <TouchableOpacity style={{ padding: 5 }}>
                            <Entypo
                                name="dots-three-vertical"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </TouchableOpacity>
                </View>
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

const MyImages = () => {
    const navigation = useNavigation();
    const click = ({ id }) => {
        navigation.navigate("ProfileDetails", { userID: id });
    };
    return (
        <FlatList
            data={dataFollowing}
            renderItem={({ item }) => (
                <TouchableOpacity
                    style={styles.cardPeople}
                    onPress={() => click({ id: item.id })}
                >
                    <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                    >
                        <Image
                            source={item.image}
                            style={{ height: 50, width: 50 }}
                        />
                        <Text style={{ marginLeft: 10 }}>{item.name}</Text>
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

const MyVideosTabView = ({ navigation }) => {
    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: "videos", title: "368 followers" },
        { key: "images", title: "456 following" },
    ]);

    const renderScene = SceneMap({
        videos: () => <MyVideos navigation={navigation} />,
        images: () => <MyImages navigation={navigation} />,
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
        />
    );
};

const dataGoiY = [
    {
        id: "1",
        name: "Boby Sandoval",
        image: require("../assets/Follow/Avatar32.png"),
    },
    {
        id: "2",
        name: "Jenie Bonce",
        image: require("../assets/Follow/Avatar38.png"),
    },
    {
        id: "3",
        name: "Anja O` Connor",
        image: require("../assets/Follow/Avatar39.png"),
    },
];

const dataFollowing = [
    {
        id: "1",
        name: "Kiran Glaucus",
        image: require("../assets/Follow/Avatar31.png"),
    },
    {
        id: "2",
        name: "Sally Rooney",
        image: require("../assets/Follow/Avatar32.png"),
    },
    {
        id: "3",
        name: "Marie Franco",
        image: require("../assets/Follow/Avatar36.png"),
    },
    {
        id: "4",
        name: "Jena Nguyen",
        image: require("../assets/Follow/Avatar35.png"),
    },
    {
        id: "5",
        name: "Kristin Watson",
        image: require("../assets/Follow/Avatar34.png"),
    },
];

export default function FollowingScreen({ navigation }) {
    return (
        <ScrollView>
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.head}>
                        <View style={styles.leftHead}>
                            <Icon2
                                name="angle-left"
                                size={30}
                                color="black"
                                onPress={() => navigation.goBack()}
                            />
                            <Image
                                style={{
                                    height: 50,
                                    width: 50,
                                    marginHorizontal: 10,
                                }}
                                source={require("../assets/MyProfile/Container71.png")}
                            />
                            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                                Ruth Sanders
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

                    <MyVideosTabView />

                    <View>
                        <Text
                            style={{
                                backgroundColor: "#eee",
                                padding: 10,
                                fontWeight: "bold",
                                fontSize: 16,
                            }}
                        >
                            Suggestion for you
                        </Text>
                        <FlatList
                            data={dataGoiY}
                            renderItem={({ item }) => (
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        padding: 5,
                                    }}
                                >
                                    <TouchableOpacity style={styles.cardPeople}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Image
                                                source={item.image}
                                                style={{
                                                    height: 50,
                                                    width: 50,
                                                    marginLeft: 10,
                                                }}
                                            />
                                            <Text style={{ marginLeft: 10 }}>
                                                {item.name}
                                            </Text>
                                        </View>
                                        <View
                                            style={{
                                                paddingVertical: 10,
                                                paddingHorizontal: 20,
                                                borderRadius: 10,
                                                backgroundColor: "#00BFFF",
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color: "white",
                                                    fontWeight: "500",
                                                }}
                                            >
                                                Follow
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ padding: 5 }}>
                                        <AntDesign
                                            name="close"
                                            size={24}
                                            color="black"
                                        />
                                    </TouchableOpacity>
                                </View>
                            )}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{
                                width: "100%",
                                paddingHorizontal: 10,
                            }}
                        />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 10,
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
        height: 4,
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
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        padding: 5,
    },
});
