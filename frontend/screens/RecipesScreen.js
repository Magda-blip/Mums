
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
import { commonStyles } from "../constants/CommonStyles";

import { supabase } from "../lib/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import ScreenBackground from "../components/ScreenBackground";


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
        <Pressable onPress={() => navigation.goBack()}>
          <Text style={styles.description}>Tillbaka</Text>
        </Pressable>
      </View>
    );
  }

  return (

    <ScreenBackground>

      <SafeAreaView style={{ flex: 1 }}>

        <View style={commonStyles.titleTextBox}>
          <Text style={commonStyles.title}>Recept</Text>
        </View>

        <FlatList
          style={{ flex: 1 }}
          data={recipes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              style={commonStyles.card}
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
          style={commonStyles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={commonStyles.buttonText}>Tillbaka</Text>
        </Pressable>

      </SafeAreaView>
    </ScreenBackground>

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
    color: colours.pergament,
  },
});