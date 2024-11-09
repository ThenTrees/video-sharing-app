import { NavigationContainer } from "@react-navigation/native";
import homeScreen from "./screens/homeScreen";
import SearchScreen from "./screens/searchScreen";
import VideoWatchingScreen from "./screens/videoWatchingScreen.js";
import ProfileScreen from "./screens/profileScreen";
import FollowingScreen from "./screens/followingScreen";
import ProfileDetailScreen from "./screens/profileDetailScreen";
import PostVideoScreen from "./screens/postVideoScreen";
import FriendScreen from "./screens/friendScreen";
import CreateVideoFilterScreen from "./screens/createVideoFilterScreen";
import VideoStreamingScreen from "./screens/videoStreamingScreen.js";
import LoginScreen from "./screens/loginScreen.js";
import RegisterScreen from "./screens/registerScreen.js";
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen
                    name="HomeScreen"
                    component={homeScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="SearchScreen"
                    component={SearchScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VideoWatchingScreen"
                    component={VideoWatchingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileScreen"
                    component={ProfileScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FollowingScreen"
                    component={FollowingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ProfileDetailScreen"
                    component={ProfileDetailScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="PostVideoScreen"
                    component={PostVideoScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="FriendScreen"
                    component={FriendScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="CreateVideoFilterScreen"
                    component={CreateVideoFilterScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="VideoStreamingScreen"
                    component={VideoStreamingScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="LoginScreen"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="RegisterScreen"
                    component={RegisterScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
