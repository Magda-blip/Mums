import {
  ImageBackground,
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

import { supabase } from "../lib/supabase";


import BG from "../assets/images/background_mums.png";

export default function HomeScreen({ navigation, session }) {
  async function handleLogout() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      Alert.alert("Kunde inte logga ut", error.message);
    }
  }

  return (
    <ImageBackground
      source={BG}
      resizeMode="cover"
      style={styles.container}
    >
      <View style={styles.textBox}>

        <Text style={styles.subtitle}>
          Recept-appen
        </Text>
        <Text style={styles.title}>Mums</Text>

        <Text style={styles.subtitle}>
          För att du älskar mat
        </Text>
      </View>

      {!session && (
        <>
          <Pressable
            style={({ pressed }) => [
              styles.loginButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.buttonText}>Logga in</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.registerButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.buttonText}>Skapa konto</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.recipesButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate("Recipes")}
      >
        <Text style={styles.buttonText}>Visa recept</Text>
      </Pressable>

      {session && (
        <>
          <Pressable
            style={({ pressed }) => [
              styles.recipesButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={() => navigation.navigate("AddRecipe")}
          >
            <Text style={styles.buttonText}>Lägg till recept</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.recipesButton,
              pressed && styles.buttonPressed,
            ]}
            onPress={handleLogout}
          >
            <Text style={styles.buttonText}>Logga ut</Text>
          </Pressable>
        </>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  //title: {
  //fontSize: 76,
  //fontWeight: "bold",
  //fontFamily: fonts.title,
  //color: colours.skog,
  //marginBottom: 150,
  //textShadowColor: "rgba(0, 0, 0, 0.7)",
  //textShadowOffset: { width: 2, height: 2 },
  //textShadowRadius: 4,

  //},

  loginButton: {
    backgroundColor: "rgba(197, 164, 109, 0.85)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
  },

  registerButton: {
    backgroundColor: "rgba(197, 164, 109, 0.85)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
    marginTop: 16,
  },

  recipesButton: {
    backgroundColor: "rgba(197, 164, 109, 0.85)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
    marginTop: 16,
  },

  buttonText: {
    color: colours.skog,
    fontSize: 18,
    fontWeight: "600",
  },

  buttonPressed: {
    opacity: 0.65,
  },

  textBox: {
    backgroundColor: "rgba(197, 164, 109, 0.6)",
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 150,
  },

  title: {
    fontSize: 56,
    fontWeight: "bold",
    fontFamily: fonts.title,
    color: colours.skog,
    marginBottom: 8,
    // textShadowColor: "rgba(0, 0, 0, 0.7)",
    // textShadowOffset: { width: 2, height: 2 },
    //textShadowRadius: 4,
  },

  subtitle: {
    fontSize: 25,
    fontWeight: "bold",
    fontFamily: fonts.title,
    color: colours.skog,
    textAlign: "center",
    // textShadowColor: "rgba(0, 0, 0, 0.7)",
    // textShadowOffset: { width: 2, height: 2 },
    //textShadowRadius: 4,
  },

});