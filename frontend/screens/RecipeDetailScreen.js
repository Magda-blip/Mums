
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert
} from "react-native";

import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { supabase } from "../lib/supabase";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params;

  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userId, setUserId] = useState(null);

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      async function fetchRecipe() {
        try {
          const { data, error } = await supabase
            .from("recipes")
            .select("*")
            .eq("id", recipeId)
            .single();

          if (error) {
            throw error;
          }

          const formattedRecipe = {
            ...data,
            cookingTime: data.cooking_time,
            ingredients: data.ingredients
              ? data.ingredients.split(",").map((ingredient) => ingredient.trim())
              : [],
          };

          if (isActive) {
            setRecipe(formattedRecipe);
            setError(false);
          }
        } catch (error) {
          console.log("Fel vid hämtning av recept:", error);

          if (isActive) {
            setError(true);
          }
        } finally {
          if (isActive) {
            setLoading(false);
          }
        }
      }

      fetchRecipe();

      return () => {
        isActive = false;
      };
    }, [recipeId])
  );


  useEffect(() => {


    async function fetchUser() {
      const { data: { user } } = await supabase.auth.getUser();

      setUserId(user?.id ?? null);
    }

    fetchUser();
  }, []);

  const isOwner = Boolean(
    userId && recipe?.user_id && recipe.user_id === userId
  );
  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colours.bark} />
        <Text style={styles.description}>Hämtar recept...</Text>
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View style={styles.container}>
        <Text style={styles.description}>
          Receptet kunde inte visas.
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Tillbaka</Text>
        </Pressable>
      </View>
    );
  }

  async function deleteRecipe() {
    Alert.alert(
      "Ta bort recept",
      "Är du säker på att du vill ta bort receptet?",
      [
        {
          text: "Avbryt",
          style: "cancel",
        },
        {
          text: "Ta bort",
          style: "destructive",
          onPress: async () => {
            try {
              const { data: { user }, error: userError } =
                await supabase.auth.getUser();

              if (userError || !user) {
                Alert.alert("Du måste logga in", "Logga in för att ta bort recept.");
                return;
              }

              const { data, error } = await supabase
                .from("recipes")
                .delete()
                .eq("id", recipe.id)
                .eq("user_id", user.id)
                .select();

              if (error) {
                throw error;
              }

              if (!data || data.length === 0) {
                Alert.alert(
                  "Kunde inte ta bort",
                  "Du äger inte receptet eller så tillåter inte databasen borttagningen."
                );
                return;
              }

              Alert.alert("Recept borttaget", "Receptet har tagits bort.");
              navigation.goBack();
            } catch (error) {
              console.log("Fel vid borttagning av recept:", error);
              Alert.alert("Kunde inte ta bort", "Något gick fel när receptet skulle tas bort.");
            }
          },
        },
      ]
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

        {(recipe.ingredients ?? []).map((ingredient, index) => (
          <Text key={index} style={styles.ingredient}>
            • {ingredient}
          </Text>
        ))}

        <Text style={styles.heading}>Gör så här</Text>

        <Text style={styles.instructions}>
          {recipe.instructions}
        </Text>

        {isOwner && (
          <>
            <Pressable
              style={styles.actionButton}
              onPress={() => navigation.navigate("EditRecipe", {
                recipeId: recipe.id,
              })}
            >
              <Text style={styles.actionButtonText}>Ändra recept</Text>
            </Pressable>

            <Pressable
              style={styles.actionButton}
              onPress={deleteRecipe}
            >
              <Text style={styles.actionButtonText}>Ta bort recept</Text>
            </Pressable>
          </>
        )}

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
  actionButton: {
    backgroundColor: colours.terrakotta,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 12,
  },

  actionButtonText: {
    color: colours.pergament,
    fontSize: 18,
    fontWeight: "600",
  },
});
