
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
} from "react-native";

import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export default function AddRecipeScreen({ navigation }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [saving, setSaving] = useState(false);
  const [isPublic, setIsPublic] = useState(false);

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    async function checkLogin() {
      const { data } = await supabase.auth.getSession();

      if (!data.session) {
        Alert.alert(
          "Du måste logga in",
          "Logga in för att lägga till recept."
        );
        navigation.replace("Home");
      }

      setCheckingAuth(false);
    }

    checkLogin();
  }, []);

  async function saveRecipe() {
    if (!name.trim()) {
      Alert.alert("Saknar namn", "Du måste ange ett receptnamn.");
      return;
    }
    const { data: { user }, error: userError } =
      await supabase.auth.getUser();

    if (userError || !user) {
      Alert.alert("Du måste logga in", "Logga in för att spara recept.");
      return;
    }
    setSaving(true);

    try {
      const { error } = await supabase
        .from("recipes")
        .insert({
          name: name.trim(),
          description: description.trim(),
          cooking_time: cookingTime.trim()
            ? Number(cookingTime)
            : null,
          ingredients: ingredients.trim(),
          instructions: instructions.trim(),
          user_id: user.id,
          is_public: isPublic,
        });

      if (error) {
        throw error;
      }

      Alert.alert("Recept sparat!", "Ditt recept har lagts till.");

      setName("");
      setDescription("");
      setCookingTime("");
      setIngredients("");
      setInstructions("");
    } catch (error) {
      console.log("Fel vid sparande av recept:", error);
      Alert.alert(
        "Kunde inte spara",
        "Något gick fel när receptet skulle sparas."
      );
    } finally {
      setSaving(false);
    }
  }

  if (checkingAuth) {
    return null;
  }
  return (
    <ScrollView style={styles.container}>



      <Text style={styles.title}>Lägg till recept</Text>

      <Text style={styles.label}>Namn</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Receptets namn"
      />

      <Text style={styles.label}>Beskrivning</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Kort beskrivning"
      />

      <Text style={styles.label}>Tillagningstid (minuter)</Text>
      <TextInput
        style={styles.input}
        value={cookingTime}
        onChangeText={setCookingTime}
        placeholder="Exempel: 20"
        keyboardType="numeric"
      />

      <Text style={styles.label}>Ingredienser</Text>
      <TextInput
        style={styles.input}
        value={ingredients}
        onChangeText={setIngredients}
        placeholder="Exempel: Pasta, tomater, olivolja"
        multiline
      />

      <Text style={styles.label}>Instruktioner</Text>
      <TextInput
        style={[styles.input, styles.instructions]}
        value={instructions}
        onChangeText={setInstructions}
        placeholder="Beskriv hur receptet tillagas"
        multiline
      />
      <Text style={styles.label}>Vem ska kunna se receptet?</Text>

      <Pressable onPress={() => setIsPublic(false)}>
        <Text>
          {isPublic === false ? "🔘" : "⚪"} Bara jag
        </Text>
      </Pressable>

      <Pressable onPress={() => setIsPublic(true)}>
        <Text>
          {isPublic === true ? "🔘" : "⚪"} Alla användare
        </Text>
      </Pressable>
      <Button
        title={saving ? "Sparar..." : "Spara recept"}
        onPress={saveRecipe}
        disabled={saving}
      />

      <Pressable onPress={() => navigation.goBack()}>
        <Text>← Tillbaka</Text>
      </Pressable>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF8E7",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    fontFamily: "IndieFlower",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#B7A58A",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "white",
  },
  instructions: {
    minHeight: 120,
    textAlignVertical: "top",
  },
});