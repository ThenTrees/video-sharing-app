import {
    Image,
    ImageBackground,
    Modal,
    SafeAreaView,
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    FlatList,
    Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Ionicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import { useState } from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const dataFilter = [
    {
        id: "1",
        name: "Film",
        image: require("../assets/CreateVideoSelectFilter/Image45.png"),
    },
    {
        id: "2",
        name: "Black white",
        image: require("../assets/CreateVideoSelectFilter/Image38.png"),
    },
    {
        id: "3",
        name: "Natural",
        image: require("../assets/CreateVideoSelectFilter/Image40.png"),
    },
    {
        id: "4",
        name: "Art",
        image: require("../assets/CreateVideoSelectFilter/Image39.png"),
    },
    {
        id: "5",
        name: "Vintage",
        image: require("../assets/CreateVideoSelectFilter/Image41.png"),
    },
    {
        id: "6",
        name: "Spring",
        image: require("../assets/CreateVideoSelectFilter/Image42.png"),
    },
    {
        id: "7",
        name: "Baby",
        image: require("../assets/CreateVideoSelectFilter/Image43.png"),
    },
    {
        id: "8",
        name: "Contrast",
        image: require("../assets/CreateVideoSelectFilter/Image44.png"),
    },
];

const dataMusic = [
    {
        id: "1",
        name: "Beautiful lady",
        time: "00:30",
        image: require("../assets/CreateVideoSelectMusic/Image49.png"),
    },
    {
        id: "2",
        name: "Nice day",
        time: "00:30",
        image: require("../assets/CreateVideoSelectMusic/Image50.png"),
    },
    {
        id: "3",
        name: "Sunny",
        time: "00:30",
        image: require("../assets/CreateVideoSelectMusic/Image51.png"),
    },
    {
        id: "4",
        name: "Flower",
        time: "00:30",
        image: require("../assets/CreateVideoSelectMusic/Image52.png"),
    },
    {
        id: "5",
        name: "Morning coffee",
        time: "00:30",
        image: require("../assets/CreateVideoSelectMusic/Image53.png"),
    },
];

export default CreateVideoFilterScreen = ({ navigation }) => {
    const widthScreen = Dimensions.get("window").width;

    const [modalVisible, setModalVisible] = useState(false);
    const [modalMusicVisible, setModalMusicVisible] = useState(false);

    const [typeModal, setTypeModal] = useState("");

    const listTab = ["For you", "Trending", "Saved"];
    const [tabIsActive, setTabIsActive] = useState("For you");
    const [musicIsActive, setMusicIsActice] = useState(1);
    const renderFilter = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.filterItem]}>
                <Image resizeMode="cover" source={item.image} />
                <Text style={{ color: "gray" }}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderMusic = ({ item }) => {
        return (
            <TouchableOpacity
                onPress={() => setMusicIsActice(item.id)}
                style={[
                    styles.musicItem,
                    item.id == musicIsActive
                        ? { backgroundColor: "#fef0f5" }
                        : { backgroundColor: "#fff" },
                ]}
                key={item.id}
            >
                <Image source={item.image} />
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "600", paddingTop: 5 }}>
                        {item.name}
                    </Text>
                    <Text style={{ fontSize: 13, color: "#ccc" }}>
                        {item.time}
                    </Text>
                </View>
                <TouchableOpacity
                    style={{
                        borderWidth: 1,
                        borderColor: "#f44b87",
                        paddingVertical: 5,
                        paddingHorizontal: 15,
                        borderRadius: 5,
                        backgroundColor: "#fff",
                    }}
                >
                    <Text style={{ fontSize: 13, color: "#f44b87" }}>Use</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Entypo
                        name="dots-three-horizontal"
                        size={20}
                        color="black"
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <ImageBackground
                source={require("../assets/CreateVideoSelectFilter/Image35.png")}
                style={{ width: "100%", height: "100%", position: "relative" }}
            >
                {/* header section */}
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                    <View>
                        <TouchableOpacity
                            onPress={() => {
                                setModalMusicVisible(!modalMusicVisible),
                                    setTypeModal("music");
                            }}
                        >
                            <Image
                                style={{
                                    marginLeft: widthScreen / 4,
                                    marginTop: 10,
                                }}
                                source={require("../assets/CreateVideoSelectFilter/Button9.png")}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                {/* nav vertical */}
                <View style={styles.navVer}>
                    <Image
                        source={require("../assets/CreateVideoSelectFilter/Repeat2.png")}
                    />
                    <Image
                        source={require("../assets/CreateVideoSelectFilter/Flip.png")}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setModalVisible(!modalVisible);
                            setTypeModal("filter");
                        }}
                    >
                        <FontAwesome6
                            name="bars-staggered"
                            size={24}
                            color="#fff"
                        />
                    </TouchableOpacity>
                    <Image
                        source={require("../assets/CreateVideoSelectFilter/Filter.png")}
                    />
                    <Ionicons name="timer-outline" size={24} color="#fff" />
                    <Image
                        source={require("../assets/CreateVideoSelectFilter/Timer.png")}
                    />
                    <Ionicons name="flash-outline" size={24} color="#fff" />
                    <Image
                        source={require("../assets/CreateVideoSelectFilter/Flash.png")}
                    />
                </View>
                {/* button record */}

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: 20,
                        position: "absolute",
                        bottom: 30,
                        flex: 1,
                        width: "100%",
                    }}
                >
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcons
                            name="emoticon-happy"
                            size={24}
                            color="#fff"
                        />
                        <Text style={{ color: "#fff" }}>Effect</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/CreateVideo-UploadVideo/Container54.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <FontAwesome name="photo" size={24} color="#fff" />
                        <Text style={{ color: "#fff" }}>Upload</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
            {/* filter */}
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
                                Add filter
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    setTypeModal("");
                                }}
                            >
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                        {/* tab option */}
                        <View style={[styles.listTab]}>
                            <FontAwesome name="ban" size={24} color="#f44b87" />
                            {listTab.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setTabIsActive(item)}
                                    style={[
                                        styles.tab,
                                        tabIsActive === item
                                            ? {
                                                  backgroundColor: "#f44b87",
                                              }
                                            : { backgroundColor: "white" },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            tabIsActive === item
                                                ? {
                                                      color: "#fff",
                                                      fontWeight: 500,
                                                  }
                                                : { color: "#f44b87" },
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        {/* list filter */}
                        <View>
                            <FlatList
                                data={dataFilter}
                                renderItem={renderFilter}
                                keyExtractor={(item) => item.id}
                                numColumns={5}
                                contentContainerStyle={styles.listFilter}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
            {/* music */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalMusicVisible}
                onRequestClose={() => {
                    setModalMusicVisible(!modalMusicVisible);
                }}
            >
                <View style={styles.modalOverlay}>
                    <View
                        style={[
                            styles.modalContainer,
                            typeModal === "filter"
                                ? { height: "40%" }
                                : { height: "55%" },
                        ]}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ fontSize: 18, fontWeight: "600" }}>
                                Add Audio
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalMusicVisible(!modalMusicVisible);
                                    setTypeModal("");
                                }}
                            >
                                <AntDesign
                                    name="close"
                                    size={24}
                                    color="#000"
                                />
                            </TouchableOpacity>
                        </View>
                        {/* tab option */}
                        <View style={[styles.listTab]}>
                            {listTab.map((item, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => setTabIsActive(item)}
                                    style={[
                                        styles.tab,
                                        tabIsActive === item
                                            ? {
                                                  backgroundColor: "#f44b87",
                                              }
                                            : { backgroundColor: "white" },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            tabIsActive === item
                                                ? {
                                                      color: "#fff",
                                                      fontWeight: 500,
                                                  }
                                                : { color: "#f44b87" },
                                        ]}
                                    >
                                        {item}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <FlatList
                            data={dataMusic}
                            renderItem={renderMusic}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={{ marginTop: 10 }}
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
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        padding: 20,
    },
    navVer: {
        justifyContent: "space-between",
        alignItems: "flex-end",
        columnGap: 20,
        rowGap: 10,
        padding: 15,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.0)",
    },
    modalContainer: {
        backgroundColor: "#fff",
        height: "40%",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 15,
    },
    listTab: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    tab: {
        borderRadius: 50,
        paddingVertical: 7,
        paddingHorizontal: 20,
    },
    filterItem: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 15,
    },
    listFilter: {
        paddingVertical: 20,
    },
    musicItem: {
        flexDirection: "row",
        padding: 10,
        gap: 10,
        alignItems: "center",
        borderRadius: 5,
    },
});
