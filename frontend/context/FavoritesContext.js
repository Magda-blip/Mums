import { createContext, useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export const FavoritesContext = createContext();

export function FavoritesProvider({ children, session }) {
  const [favorites, setFavorites] = useState([]);


  useEffect(() => {
    async function fetchFavorites() {
      if (!session) {
        setFavorites([]);
        return;
      }

      const { data, error } = await supabase
        .from("favorites")
        .select("recipe_id")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Kunde inte hämta favoriter:", error);
        return;
      }

      setFavorites(data.map((favorite) => favorite.recipe_id));
    }

    fetchFavorites();
  }, [session]);


  async function toggleFavorite(recipeId) {
    if (!session) {
      return;
    }

    const userId = session.user.id;
    const id = String(recipeId);

    const isFavorite = favorites.includes(id);

    if (isFavorite) {
      const { error } = await supabase
        .from("favorites")
        .delete()
        .eq("user_id", userId)
        .eq("recipe_id", id);

      if (error) {
        console.error("Kunde inte ta bort favorit:", error);
        return;
      }

      setFavorites((currentFavorites) =>
        currentFavorites.filter((favoriteId) => favoriteId !== id)
      );
    } else {
      console.log("Försöker spara favorit:", {
        userId,
        recipeId: id,
      });

      const { data, error } = await supabase
        .from("favorites")
        .insert({
          user_id: userId,
          recipe_id: id,
        })
        .select();

      if (error) {
        console.error("Kunde inte spara favorit:", error);
        return;
      }

      console.log("Favorit sparad i Supabase:", data);

      setFavorites((currentFavorites) => [
        ...currentFavorites,
        id,
      ]);
    }
  }

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}