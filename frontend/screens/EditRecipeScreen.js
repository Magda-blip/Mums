import { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
  ScrollView,
} from "react-native";

import { supabase } from "../lib/supabase";
import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

export default function EditRecipeScreen({ route, navigation }) {
  const { recipeId } = route.params;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchRecipe() {
      try {
        const { data, error } = await supabase
          .from("recipes")
          .select("*")
          .eq("id", recipeId)
          .single();

        if (error) throw error;

        setName(data.name ?? "");
        setDescription(data.description ?? "");
        setCookingTime(
          data.cooking_time != null
            ? String(data.cooking_time)
            : ""
        );
        setIngredients(data.ingredients ?? "");
        setInstructions(data.instructions ?? "");
        setIsPublic(data.is_public ?? false);
      } catch (error) {
        console.log("Fel vid hämtning av recept:", error);
        Alert.alert("Fel", "Kunde inte hämta receptet.");
      } finally {
        setLoading(false);
      }
    }

    fetchRecipe();
  }, [recipeId]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={colours.skog} />
        <Text>Hämtar recept...</Text>
      </View>
    );
  }
  async function saveChanges() {
    if (!name.trim()) {
      Alert.alert("Saknar namn", "Du måste ange ett receptnamn.");
      return;
    }

    setSaving(true);

    try {
      const { data: { user }, error: userError } =
        await supabase.auth.getUser();

      if (userError || !user) {
        Alert.alert("Du måste logga in", "Logga in för att ändra recept.");
        return;
      }

      const { data, error } = await supabase
        .from("recipes")
        .update({
          name: name.trim(),
          description: description.trim(),
          cooking_time: cookingTime.trim()
            ? Number(cookingTime)
            : null,
          ingredients: ingredients.trim(),
          instructions: instructions.trim(),
          is_public: isPublic,
        })
        .eq("id", recipeId)
        .eq("user_id", user.id)
        .select();

      if (error) {
        throw error;
      }

      if (!data || data.length === 0) {
        Alert.alert(
          "Receptet ändrades inte",
          "Kontrollera att du äger receptet och att databasen tillåter ändringen."
        );
        return;
      }

      Alert.alert("Recept uppdaterat!", "Dina ändringar har sparats.");
      navigation.goBack();

    } catch (error) {
      console.log("Fel vid ändring av recept:", error);
      Alert.alert(
        "Kunde inte spara",
        "Något gick fel när receptet skulle ändras."
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Ändra recept</Text>

      <Text style={styles.label}>Namn</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        accessibilityLabel="Receptets namn"
        accessibilityHint="Ändra receptets namn"
      />

      <Text style={styles.label}>Beskrivning</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
        accessibilityLabel="Receptets beskrivning"
        accessibilityHint="Ändra receptets beskrivning"
      />

      <Text style={styles.label}>Tillagningstid (minuter)</Text>
      <TextInput
        style={styles.input}
        value={cookingTime}
        onChangeText={setCookingTime}
        keyboardType="numeric"
        accessibilityLabel="Receptets tillagningstid"
        accessibilityHint="Ändra receptets tillagningstid"
      />

      <Text style={styles.label}>Ingredienser</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        multiline
        accessibilityLabel="Receptets ingredienser"
        accessibilityHint="Ändra receptets ingredienser"
      />

      <Text style={styles.label}>Gör så här</Text>
      <TextInput
        style={styles.input}
        value={instructions}
        onChangeText={setInstructions}
        multiline
        accessibilityLabel="Receptets tillagning"
        accessibilityHint="Ändra receptets tillagningsinstruktioner"
      />

      <Text style={styles.label}>Vem ska kunna se receptet?</Text>

      <Pressable
        accessibilityRole="radio"
        accessibilityLabel="Bara jag"
        accessibilityState={{ selected: isPublic === false }}
        onPress={() => setIsPublic(false)}>
        <Text style={styles.option}>
          {isPublic ? "⚪" : "🔘"} Bara jag
        </Text>
      </Pressable>

      <Pressable
        accessibilityRole="radio"
        accessibilityLabel="Alla användare"
        accessibilityState={{ selected: isPublic === true }}
        onPress={() => setIsPublic(true)}>
        <Text style={styles.option}>
          {isPublic ? "🔘" : "⚪"} Alla användare
        </Text>
      </Pressable>

      <Pressable
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel={
          saving ? "Sparar ändringar" : "Spara ändringar"
        }
        onPress={saveChanges}
        disabled={saving}
      >
        <Text style={styles.buttonText}>
          {saving ? "Sparar..." : "Spara ändringar"}
        </Text>
      </Pressable>
      <Pressable
        style={styles.button}
        accessibilityRole="button"
        accessibilityLabel="Tillbaka"
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Tillbaka</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.pergament,
    padding: 24,
    paddingTop: 60,
  },
  title: {
    fontSize: 36,
    fontFamily: fonts.title,
    color: colours.skog,
    marginBottom: 24,
  },
  label: {
    fontSize: 17,
    color: colours.skog,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colours.beige,
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    color: colours.skog,
  },
  option: {
    fontSize: 18,
    color: colours.skog,
    paddingVertical: 8,
  },
  button: {
    backgroundColor: colours.terrakotta,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    marginBottom: 32,
  },
  buttonText: {
    color: colours.pergament,
    fontSize: 18,
    fontWeight: "600",
  },
});