
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

import { recipes } from "../data/RecipesData";
import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;

  const recipe = recipes.find(
    (item) => item.id === recipeId
  );

  if (!recipe) {
    return (
      <View style={styles.container}>
        <Text>Receptet kunde inte hittas.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>

      <ScrollView style={styles.container}>
        <Text style={styles.title}>{recipe.name}</Text>

        <Text style={styles.description}>
          {recipe.description}
        </Text>

        <Text style={styles.time}>
          Tillagningstid: {recipe.cookingTime} minuter
        </Text>

        <Text style={styles.heading}>Ingredienser</Text>

        {recipe.ingredients.map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.heading}>Gör så här</Text>

        <Text style={styles.instructions}>
          {recipe.instructions}
        </Text>

      </ScrollView>

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>Tillbaka</Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colours.mint,
  },
  container: {
    flex: 1,
    backgroundColor: colours.mint,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.title,
    color: colours.bark,
    marginBottom: 16,
  },
  description: {
    fontSize: 17,
    color: colours.bark,
    marginBottom: 12,
  },
  time: {
    fontSize: 15,
    color: colours.bark,
    marginBottom: 24,
  },
  heading: {
    fontSize: 24,
    fontWeight: "600",
    color: colours.bark,
    marginTop: 12,
    marginBottom: 12,
  },
  ingredient: {
    fontSize: 17,
    color: colours.bark,
    marginBottom: 8,
  },
  instructions: {
    fontSize: 17,
    color: colours.bark,
    lineHeight: 26,
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: colours.sage,
    alignItems: "center",
    padding: 14,
    marginHorizontal: 24,
    marginTop: 8,
    marginBottom: 16,
    borderRadius: 12,
  },
  backButtonText: {
    color: colours.bark,
    fontSize: 18,
    fontWeight: "600",
  },
});
