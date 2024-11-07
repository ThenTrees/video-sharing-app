import { NavigationContainer } from "@react-navigation/native";
import homeScreen from "./screens/homeScreen";
import SearchScreen from "./screens/searchScreen";
import VideoStreamingScreen from "./screens/videoStreamingScreen";
import ProfileScreen from "./screens/profileScreen";
import FollowingScreen from "./screens/followingScreen";
import ProfileDetailScreen from "./screens/profileDetailScreen";
import PostVideoScreen from "./screens/postVideoScreen";
import FriendScreen from "./screens/friendScreen";
import createVideoFilterScreen from "./screens/createVideoFilterScreen";
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="createVideoFilterScreen">
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
                    name="VideoStreamingScreen"
                    component={VideoStreamingScreen}
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
                    name="createVideoFilterScreen"
                    component={createVideoFilterScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
