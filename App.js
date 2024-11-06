import { NavigationContainer } from "@react-navigation/native";
import homeScreen from "./screens/homeScreen";
import SearchScreen from "./screens/searchScreen";
const Stack = createNativeStackNavigator();
import { createNativeStackNavigator } from "@react-navigation/native-stack";
export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="SearchScreen">
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
            </Stack.Navigator>
        </NavigationContainer>
    );
}
