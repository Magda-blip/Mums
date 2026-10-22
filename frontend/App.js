
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import { fonts } from "./constants/Fonts";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import RecipesScreen from "./screens/RecipesScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";

import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase";



const Stack = createNativeStackNavigator();

export default function App() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);


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
        >
          {(props) => (
            <HomeScreen {...props} session={session} />
          )}
        </Stack.Screen>

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
        <Stack.Screen
          name="AddRecipe"
          component={AddRecipeScreen}
        />
        <Stack.Screen
          name="EditRecipe"
          component={EditRecipeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
