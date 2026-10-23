
import { useState, useCallback } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";
import { commonStyles } from "../constants/CommonStyles";

import { supabase } from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenBackground from "../components/ScreenBackground";


export default function SearchScreen({ navigation }) {

  const [recipes, setRecipes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchRecipes() {
        setLoading(true);
        setError(null);

        try {
          const { data, error } = await supabase
            .from("recipes")
            .select("*")
            .order("id");

          if (error) {
            throw error;
          }

          const formattedRecipes = data.map((recipe) => ({
            ...recipe,
            cookingTime: recipe.cooking_time,
          }));

          if (isActive) {
            setRecipes(formattedRecipes);
          }

        } catch (error) {
          console.log("Fel vid hämtning av recept:", error);

          if (isActive) {
            setError("Kunde inte hämta recepten från Supabase.");
          }

        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      }

      fetchRecipes();

      return () => {
        isActive = false;
      };
    }, [])
  );


  // Filtrera recepten efter söktexten
  const filteredRecipes = recipes.filter((recipe) => {
    const search = searchText.toLowerCase().trim();

    const name = recipe.name?.toLowerCase() ?? "";
    const description = recipe.description?.toLowerCase() ?? "";

    // ingredients kan vara text eller en array
    const ingredients = Array.isArray(recipe.ingredients)
      ? recipe.ingredients
        .map((ingredient) =>
          typeof ingredient === "string"
            ? ingredient
            : ingredient.name ?? ""
        )
        .join(" ")
        .toLowerCase()
      : (recipe.ingredients ?? "").toLowerCase();

    return (
      name.includes(search) ||
      description.includes(search) ||
      ingredients.includes(search)
    );
  });


  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colours.pergament} />
        <Text style={styles.description}>Hämtar recept...</Text>
      </View>
    );
  }


  if (error) {
    return (
      <View style={commonStyles.container}>
        <Text style={styles.description}>{error}</Text>
      </View>
    );
  }


  return (
    <ScreenBackground>
      <SafeAreaView style={{ flex: 1 }}>

        <View style={commonStyles.titleTextBox}>
          <Text style={commonStyles.title}>Sök recept</Text>
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Sök recept eller ingrediens..."
          placeholderTextColor={colours.bark}
          value={searchText}
          onChangeText={setSearchText}
          autoCapitalize="none"
          accessibilityLabel="Sök recept"
          accessibilityHint="Skriv ett receptnamn, en beskrivning eller en ingrediens"
        />

        <FlatList
          style={{ flex: 1 }}
          data={filteredRecipes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              style={commonStyles.card}
              onPress={() =>
                navigation.navigate("RecipesTab", {
                  screen: "RecipeDetail",
                  params: {
                    recipeId: item.id,
                    fromSearch: true,
                  },
                })
              }
            >
              <Text style={styles.recipeName}>{item.name}</Text>

              <Text style={styles.description}>
                {item.description}
              </Text>

              <Text style={styles.time}>
                Tillagningstid: {item.cookingTime} minuter
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <Text style={styles.description}>
              {searchText.trim()
                ? "Inga recept matchar din sökning."
                : "Skriv något i sökfältet för att hitta recept."}
            </Text>
          }
        />

      </SafeAreaView>
    </ScreenBackground>
  );
}


const styles = StyleSheet.create({
  searchInput: {
    backgroundColor: colours.pergament,
    color: colours.bark,
    fontSize: 16,
    padding: 14,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 12,
  },

  recipeName: {
    fontSize: 22,
    fontWeight: "600",
    color: colours.pergament,
    marginBottom: 8,
  },

  description: {
    fontSize: 16,
    color: colours.pergament,
    marginBottom: 10,
  },

  time: {
    fontSize: 14,
    color: colours.pergament,
  },
});
