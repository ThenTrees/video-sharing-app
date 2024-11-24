import React from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon2 from "react-native-vector-icons/FontAwesome.js";
import Icon3 from "react-native-vector-icons/Entypo.js";
import HomeScreen from "./screen/home.js";
import SearchScreen from "./screen/searchSreen.js";
import FriendsScreen from "./screen/friends.js";
import ProfileScreen from "./screen/profile.js";
import videoStreaming from "./screen/videoStreaming.js";
import login from "./screen/Login.js";
import Register from "./screen/Register.js";
import post from "./screen/postVideoScreen.js";
import plus from "./screen/createVideo.js";
import createStory from "./screen/createStory.js";
import postStory from "./screen/postStory.js";
import Following from "./screen/following.js";
import profileDetails from "./screen/profiledetails.js";
import videoDetails from "./screen/videoDetails.js";
import editProfile from "./screen/editProfile.js";
import ImageView from "./screen/ImageView.js";
import StoryDetails from "./screen/storyDetails.js";

import ImageStreaming from "./screen/imageStreaming.js";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
import { useState, useEffect } from "react";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
function TabNavigator({ navigation, route }) {
    const [userData, setUserData] = useState({});

    const loadUserInfo = async () => {
        try {
            const data = JSON.parse(await AsyncStorage.getItem("userToken"));
            if (data) {
                setUserData(data);
            } else {
                navigation.navigate("Login");
            }
        } catch (e) {
            console.error("Failed to fetch data:", e);
        }
    };

    const clearSession = async () => {
        try {
            await AsyncStorage.removeItem("userToken");
        } catch (e) {
            console.error("Failed to clear the token from storage:", e);
        }
    };

    useEffect(() => {
        loadUserInfo();
    }, []);

    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                tabBarActiveTintColor: "pink",
                tabBarInactiveTintColor: "black",
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                initialParams={{ userData }}
                options={{
                    header: () => (
                        <View style={styles.headerContainer}>
                            <Text style={styles.headerTitle}>
                                Video Sharing App
                            </Text>
                            <Icon2 name="bell-o" size={25} color="black" />
                        </View>
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="home" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                initialParams={{ userData }}
                component={SearchScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="search" size={30} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Plus"
                initialParams={{ userData }}
                component={plus}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon3
                            name="circle-with-plus"
                            size={35}
                            color={color}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Friends"
                initialParams={{ userData }}
                component={FriendsScreen}
                options={{
                    // headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="users" size={25} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Profile"
                initialParams={{ userData }}
                component={ProfileScreen}
                options={{
                    header: () => (
                        <View style={styles.headerProflieContainer}>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        clearSession();
                                        navigation.navigate("Login");
                                    }}
                                    style={{ padding: 10 }}
                                >
                                    <SimpleLineIcons
                                        name="logout"
                                        size={24}
                                        color="black"
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    padding: 10,
                                    marginTop: 10,
                                }}
                                onPress={() =>
                                    navigation.navigate("EditProfile", {
                                        user: userData,
                                    })
                                }
                            >
                                <Icon2
                                    style={{
                                        color: "black",
                                        paddingHorizontal: 5,
                                    }}
                                    name="pencil"
                                    size={20}
                                />
                                <Text
                                    style={{
                                        color: "black",
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    Edit Profile
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ),
                    tabBarIcon: ({ color }) => (
                        <Icon2 name="user-circle-o" size={30} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

export default App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={login}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="VideoSharingApp"
                    component={TabNavigator}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="VideoStreaming"
                    component={videoStreaming}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Following"
                    component={Following}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="ProfileDetails"
                    component={profileDetails}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="Post"
                    component={post}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="PostStory"
                    component={postStory}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="CreateStory"
                    component={createStory}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="VideoDetails"
                    component={videoDetails}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="StoryDetails"
                    component={StoryDetails}
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="EditProfile"
                    component={editProfile}
                    options={{
                        headerTitle: "",
                    }}
                />
                <Stack.Screen
                    name="ImageView"
                    component={ImageView}
                    options={{
                        headerTitle: "",
                    }}
                />
                <Stack.Screen name="New Feed" component={ImageStreaming} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingTop: 50,
        paddingHorizontal: 20,
        paddingBottom: 20,
        backgroundColor: "white",
        borderBottomColor: "grey",
        borderBottomWidth: 0.3,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    headerProflieContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        alignItems: "center",
        paddingTop: 40,
        backgroundColor: "white",
    },
});
