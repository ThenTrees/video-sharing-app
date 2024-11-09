import {
    Image,
    ImageBackground,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    FlatList,
    TextInput,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

const dataComment = [
    {
        id: "1",
        name: "Jana",
        avatar: require("../assets/VideoStreaming/Avatar23.png"),
        comment: "Is this product available in black?",
    },
    {
        id: "2",
        name: "Lauren",
        avatar: require("../assets/VideoStreaming/Avatar24.png"),
        comment:
            "I want to buy one for my daughter's a upcoming birthday, how can i order?",
    },
];

export default function VideoStreamingScreen() {
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
                <View style={{ marginLeft: 10 }}>
                    <Text style={{ color: "#fff", fontWeight: "600" }}>
                        {item.name}
                    </Text>
                    <Text style={{ color: "#fff", fontWeight: "500" }}>
                        {item.comment}
                    </Text>
                </View>
            </View>
        );
    };

    const navigation = useNavigation();
    return (
        <ImageBackground
            source={require("../assets/VideoStreaming/Image27.png")}
            style={[{ width: "100%", height: "100%" }, styles.container_full]}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Image
                            source={require("../assets/VideoStreaming/Button7.png")}
                        />
                        <Text style={{ color: "#fff", fontWeight: "600" }}>
                            Joy Shop
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: 10,
                        }}
                    >
                        <Image
                            source={require("../assets/VideoStreaming/Tag4.png")}
                        />
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="close" size={24} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.comment}>
                    <FlatList
                        data={dataComment}
                        renderItem={renderComment}
                        keyExtractor={(item) => item.id}
                    />
                    <Image
                        source={require("../assets/VideoStreaming/Container52.png")}
                        reSizeMode="cover"
                        style={{
                            marginVertical: 10,
                            width: "100%",
                            borderRadius: 10,
                            padding: 10,
                        }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder="Leave comment ..."
                        placeholderTextColor="#fff"
                        style={styles.input}
                    ></TextInput>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/VideoStreaming/like1.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/VideoStreaming/tym.png")}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            source={require("../assets/VideoStreaming/hh1.png")}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container_full: {
        flex: 1,
        position: "relative",
        zIndex: -1,
    },
    container: {
        position: "absolute",
        top: 10,
        left: 10,
        right: 10,
        bottom: 10,
        padding: 10,
        zIndex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    comment: {
        position: "absolute",
        bottom: 70,
        left: 10,
        right: 10,
    },
    inputContainer: {
        flexDirection: "row",
        position: "absolute",
        bottom: 10,
    },
    input: {
        backgroundColor: "#323842",
        borderRadius: 10,
        padding: 10,
        flex: 1,
        fontSize: 16,
        marginHorizontal: 10,
    },
});
