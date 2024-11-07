import { TouchableOpacity } from "react-native";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    ScrollView,
    FlatList,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import NavComponent from "../components/navComponent.js";
import Line from "../components/line.js";
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

const dataStories = [
    {
        id: "1",
        containerImage: require("../assets/Home_Video_Listing/Container13.png"),
        userImage: require("../assets/Home_Video_Listing/You.png"),
    },
    {
        id: "2",
        containerImage: require("../assets/Home_Video_Listing/Container17.png"),
        userImage: require("../assets/Home_Video_Listing/Adam.png"),
    },
    {
        id: "3",
        containerImage: require("../assets/Home_Video_Listing/Container20.png"),
        userImage: require("../assets/Home_Video_Listing/William.png"),
    },
    {
        id: "4",
        containerImage: require("../assets/Home_Video_Listing/Container23.png"),
        userImage: require("../assets/Home_Video_Listing/Peter.png"),
    },
    {
        id: "5",
        containerImage: require("../assets/Home_Video_Listing/Container26.png"),
        userImage: require("../assets/Home_Video_Listing/Julia.png"),
    },
    {
        id: "6",
        containerImage: require("../assets/Home_Video_Listing/Container29.png"),
        userImage: require("../assets/Home_Video_Listing/Rose.png"),
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

const dataNav = [
    {
        id: "1",
        name: "film",
        title: "Home",
        marginLeft: -10,
        color: "pink",
        size: 20,
    },
    {
        id: "2",
        name: "check",
        title: "Search",
        marginLeft: 0,
        color: "grey",
        size: 20,
    },
    {
        id: "3",
        name: "plus",
        title: "",
        marginLeft: 0,
        color: "pink",
        size: 30,
    },
    {
        id: "4",
        name: "list",
        title: "Friends",
        marginLeft: 0,
        color: "grey",
        size: 20,
    },
    {
        id: "5",
        name: "user",
        title: "My Profile",
        marginLeft: 0,
        color: "grey",
        size: 20,
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

export default function HomeScreen({ navigation }) {
    // Hàm renderItem cho phần Stories
    const renderItem1 = ({ item }) => (
        <TouchableOpacity style={styles.padTouch}>
            <Image source={item.containerImage} />
            <Image source={item.userImage} />
        </TouchableOpacity>
    );

    // Hàm renderItem
    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={[styles.padTouch, { marginLeft: item.marginLeft }]}
            onPress={() => navigation.navigate("VideoStreaming")}
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

    // Hàm renderIcon
    // const renderIcon = ({ item }) => (
    //     <TouchableOpacity style={{ marginLeft: item.marginLeft }}>
    //         <Icon name={item.name} size={item.size} color={item.color} />
    //         <Text style={{ color: item.color }}>{item.title}</Text>
    //     </TouchableOpacity>
    // );
    return (
        <ScrollView
            style={styles.container}
            vertical={true}
            showsVerticalScrollIndicator={false}
        >
            <SafeAreaView>
                {/* header */}
                <View style={styles.header}>
                    <Image
                        style={styles.logoIcon}
                        source={require("../assets/favicon.png")}
                    />
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
                <SafeAreaView style={styles.listStory}>
                    <FlatList
                        data={dataStories}
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
                                navigation.navigate("VideoStreaming")
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
                        renderItem={renderItem}
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
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        width: "100%",
        height: 500,
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
