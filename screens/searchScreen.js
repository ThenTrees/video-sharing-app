"use strict";
import {
    Dimensions,
    FlatList,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
} from "react-native";
import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/EvilIcons";
import { useState } from "react";
import NavComponent from "../components/navComponent";
import Line from "../components/line";

const data = [
    {
        id: "1",
        name: "Laura",
        avatar: require("../assets/SearchVideo/Avatar13.png"),
        background: require("../assets/SearchVideo/Container40.png"),
        caption: "excuti clizser dog myzs vnsqer csavn cas utikcs",
    },
    {
        id: "2",
        name: "Liz",
        avatar: require("../assets/SearchVideo/Avatar14.png"),
        background: require("../assets/SearchVideo/Container41.png"),
        caption: "excuti clizser dog myzs vnsqer csavn cas utikcs",
    },
    {
        id: "3",
        name: "Cris",
        avatar: require("../assets/SearchVideo/Avatar15.png"),
        background: require("../assets/SearchVideo/Container43.png"),
        caption: "excuti clizser dog myzs vnsqer csavn cas utikcs",
    },
    {
        id: "4",
        name: "Lina",
        avatar: require("../assets/SearchVideo/Avatar16.png"),
        background: require("../assets/SearchVideo/Container44.png"),
        caption: "excuti clizser dog myzs vnsqer csavn cas utikcs",
    },
];

const widthScreen = Dimensions.get("window").width; // get width of screen
export default function SearchScreen({ navigation, route }) {
    const user = route.params?.user;
    const [searchValue, setSearchValue] = useState("Pet");
    const listTab = ["Trending", "Accounts", "Streaming", "Audio"];
    const [tab, setTab] = useState("Trending");
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.head}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        textContentType="search"
                        placeholder="search ..."
                        placeholderTextColor={"#ccc"}
                        value={searchValue}
                        onChangeText={(text) => setSearchValue(text)}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSearchValue("");
                        }}
                    >
                        <Icon
                            name="close"
                            color="black"
                            size={20}
                            style={{
                                padding: 10,
                                position: "absolute",
                                right: 0,
                                top: -21,
                            }}
                        />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={{ paddingHorizontal: 10 }}>
                    <Icon name="navicon" color="black" size={30} />
                </TouchableOpacity>
            </View>

            <View
                style={[
                    styles.head,
                    {
                        justifyContent: "space-between",
                        paddingVertical: 10,
                    },
                ]}
            >
                {listTab.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() => {
                            setTab(item);
                        }}
                        style={[tab === item && styles.activeTab]}
                    >
                        <Text
                            style={[
                                tab === item
                                    ? {
                                          color: "#fff",
                                          fontSize: 15,
                                      }
                                    : { color: "#f44b86", fontSize: 15 },
                            ]}
                        >
                            {item}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <FlatList
                data={data}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={{ width: widthScreen / 2, padding: 10 }}
                    >
                        <Image
                            source={item.background}
                            style={{ alignSelf: "center" }}
                            resizeMode="contain"
                        />
                        <Text style={{ padding: 10 }}>{item.caption}</Text>
                        <View
                            style={{
                                flexDirection: "row",
                                width: "100%",
                                alignItems: "center",
                            }}
                        >
                            <Image
                                style={{ marginLeft: 10 }}
                                source={item.avatar}
                            />
                            <Text style={{ paddingHorizontal: 10 }}>
                                {item.name}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />

            <TouchableOpacity style={styles.showMore}>
                <Text style={{ color: "#FF1493" }}>Show more</Text>
                <Icon
                    style={{ color: "#FF1493" }}
                    name="chevron-down"
                    color="black"
                    size={24}
                />
            </TouchableOpacity>
            <Line />
            <Text style={styles.maybe}>Maybe you're interesting</Text>

            <View style={styles.sussgestion}>
                <TouchableOpacity style={styles.hasTag}>
                    <Text style={{ color: "#709aca", fontSize: 15 }}>
                        Funny momment of pet
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.hasTag}>
                    <Text style={{ color: "#709aca", fontSize: 15 }}>Cats</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.hasTag}>
                    <Text style={{ color: "#709aca", fontSize: 15 }}>Dogs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.hasTag}>
                    <Text style={{ color: "#709aca", fontSize: 15 }}>
                        Food for pet
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.hasTag}>
                    <Text style={{ color: "#709aca", fontSize: 15 }}>
                        Vet Center
                    </Text>
                </TouchableOpacity>
            </View>
            <Line />
            <NavComponent />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: 40,
        paddingHorizontal: 10,
    },
    head: {
        flexDirection: "row",
        alignItems: "center",
    },
    inputContainer: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#eee",
        borderRadius: 10,
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 10,
        paddingRight: 20,
        position: "relative",
    },
    showMore: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        paddingBottom: 30,
    },
    sussgestion: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    maybe: {
        fontSize: 18,
        fontWeight: "bold",
    },
    activeTab: {
        backgroundColor: "#f44b86",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    hasTag: {
        padding: 10,
        backgroundColor: "#eff6ff",
        borderRadius: 20,
        marginRight: 10,
        marginVertical: 5,
    },
});
