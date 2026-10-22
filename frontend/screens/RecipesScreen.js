
import { useState } from "react";

import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

import { supabase } from "../lib/supabase";


export default function RecipesScreen({ navigation }) {

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  function toggleFavorite(recipeId) {
    setFavorites((currentFavorites) => {
      if (currentFavorites.includes(recipeId)) {
        return currentFavorites.filter((id) => id !== recipeId);
      }

      return [...currentFavorites, recipeId];
    });
  }

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
          console.log("Felmeddelande:", error.message);
          console.log("Felkod:", error.code);

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


  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colours.bark} />
        <Text style={styles.description}>Hämtar recept...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>{error}</Text>
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.description}>Tillbaka</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recept</Text>

      <FlatList
        data={recipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Pressable
            style={styles.recipeCard}
            onPress={() =>
              navigation.navigate("RecipeDetail", {
                recipeId: item.id,
              })
            }
          >
            <View style={styles.recipeHeader}>
              <Text style={styles.recipeName}>{item.name}</Text>

              <Pressable
                onPress={(event) => {
                  event.stopPropagation();
                  toggleFavorite(item.id);
                }}
                hitSlop={10}
              >
                <Text style={styles.heart}>
                  {favorites.includes(item.id) ? "♥" : "♡"}
                </Text>
              </Pressable>
            </View>

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
  recipeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  heart: {
    fontSize: 30,
    color: colours.bark,
  },
});