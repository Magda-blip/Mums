
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import { fonts } from "./constants/Fonts";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import RecipesScreen from "./screens/RecipesScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";



const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    [fonts.title]: require("./assets/fonts/IndieFlower-Regular.ttf"),
  });


  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >

        <Stack.Screen
          name="Home"
          component={HomeScreen} />

        <Stack.Screen
          name="Register"
          component={RegisterScreen} />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          name="Recipes"
          component={RecipesScreen}
        />
        <Stack.Screen
          name="RecipeDetail"
          component={RecipeDetailScreen}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
