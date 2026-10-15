
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";
import { recipes } from "../data/RecipesData";

export default function RecipesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recept</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable style={styles.recipeCard}>
            <Text style={styles.recipeName}>{item.name}</Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.time}>
              Tillagningstid: {item.cookingTime} minuter
            </Text>
          </Pressable>
        )}
      />

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
  container: {
    flex: 1,
    backgroundColor: colours.mint,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 40,
    fontFamily: fonts.title,
    color: colours.bark,
    textAlign: "center",
    marginBottom: 24,
  },
  recipeCard: {
    backgroundColor: colours.sage,
    padding: 18,
    borderRadius: 12,
    marginBottom: 16,
  },
  recipeName: {
    fontSize: 22,
    fontWeight: "600",
    color: colours.bark,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: colours.bark,
    marginBottom: 10,
  },
  time: {
    fontSize: 14,
    color: colours.bark,
  },
  backButton: {
    alignItems: "center",
    padding: 14,
    marginTop: 8,
  },
});