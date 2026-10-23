
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import RecipesScreen from "./screens/RecipesScreen";
import RecipeDetailScreen from "./screens/RecipeDetailScreen";
import AddRecipeScreen from "./screens/AddRecipeScreen";
import EditRecipeScreen from "./screens/EditRecipeScreen";

const Stack = createNativeStackNavigator();

export default function RecipeStack({ session }) {
  return (
    <Stack.Navigator
      initialRouteName="Recipes"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Recipes">
        {(props) => (
          <RecipesScreen
            {...props}
            session={session}
          />
        )}
      </Stack.Screen>

      <Stack.Screen name="RecipeDetail">
        {(props) => (
          <RecipeDetailScreen
            {...props}
            session={session}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="AddRecipe"
        component={AddRecipeScreen}
      />

      <Stack.Screen
        name="EditRecipe"
        component={EditRecipeScreen}
      />
    </Stack.Navigator>
  );
}
