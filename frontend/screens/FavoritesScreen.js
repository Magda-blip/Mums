
import { useCallback, useContext, useState } from "react";

import {
  View,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";

import { useFocusEffect } from "@react-navigation/native";

import { supabase } from "../lib/supabase";
import { FavoritesContext } from "../context/FavoritesContext";

import { commonStyles } from "../constants/CommonStyles";
import { colours } from "../constants/Colours.js";

export default function FavoritesScreen({ navigation, session }) {

  if (!session) {
    return (
      <View>
        <Text>Logga in för att se dina favoriter.</Text>
        <Pressable
          onPress={() => navigation.navigate("Login")}
        >
          <Text>Logga in</Text>
        </Pressable>
      </View>
    );
  }

  const { favorites, toggleFavorite } = useContext(FavoritesContext);

  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchRecipes() {
        setLoading(true);

        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .order("id");

        if (isActive) {
          if (error) {
            console.log("Fel vid hämtning:", error);
          } else {
            setRecipes(
              data.map((recipe) => ({
                ...recipe,
                cookingTime: recipe.cooking_time,
              }))
            );
          }

          setLoading(false);
        }
      }

      fetchRecipes();

      return () => {
        isActive = false;
      };
    }, [])
  );

  const favoriteRecipes = recipes.filter((recipe) =>
    favorites.includes(String(recipe.id))
  );

  if (loading) {
    return (
      <View style={commonStyles.container}>
        <ActivityIndicator size="large" color={colours.bark} />
        <Text>Hämtar favoriter...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={commonStyles.title}>Favoriter</Text>

      {favoriteRecipes.length === 0 ? (
        <Text style={{ textAlign: "center", margin: 20 }}>
          Du har inga favoriter ännu.
        </Text>
      ) : (
        <FlatList
          data={favoriteRecipes}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <Pressable
              style={commonStyles.card}
              accessibilityRole="button"
              accessibilityLabel={`Visa receptet ${item.name}`}
              onPress={() =>
                navigation.navigate("RecipesTab", {
                  screen: "RecipeDetail",
                  params: {
                    recipeId: item.id,
                    fromFavorites: true,
                  },
                })
              }
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Text>{item.name}</Text>

                <Pressable
                  hitSlop={10}
                  accessibilityRole="button"
                  accessibilityLabel={
                    favorites.includes(String(item.id))
                      ? `Ta bort ${item.name} från favoriter`
                      : `Lägg till ${item.name} i favoriter`
                  }
                  accessibilityState={{
                    selected: favorites.includes(String(item.id)),
                  }}

                  onPress={(event) => {
                    event.stopPropagation();

                    if (!session) {
                      Alert.alert(
                        "Logga in",
                        "Du behöver vara inloggad för att spara favoriter."
                      );
                      return;
                    }

                    toggleFavorite(item.id);
                  }}
                >
                  <Text style={{ fontSize: 28 }}>♥</Text>
                </Pressable>
              </View>

              <Text>{item.description}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
}
