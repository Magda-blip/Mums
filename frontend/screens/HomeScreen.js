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
import { commonStyles } from "../constants/CommonStyles.js";

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


      <Text style={commonStyles.subtitle}>
        Bli tjock med
      </Text>
      <Text style={commonStyles.title}>Mums</Text>

      {/*<Text style={commonStyles.subtitle}>
        För att du älskar mat
      </Text>*/}


      {!session && (
        <>
          <Pressable
            style={({ pressed }) => [
              commonStyles.button,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Logga in"
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={commonStyles.buttonText}>Logga in</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              commonStyles.button,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Skapa konto"
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={commonStyles.buttonText}>Skapa konto</Text>
          </Pressable>
        </>
      )}

      <Pressable
        style={({ pressed }) => [
          commonStyles.button,
          pressed && styles.buttonPressed,
        ]}
        accessibilityRole="button"
        accessibilityLabel="Visa recept"
        onPress={() =>
          navigation.navigate("MainTabs", {
            screen: "RecipesTab",
            params: {
              screen: "Recipes",
            },
          })
        }
      >
        <Text style={commonStyles.buttonText}>Visa recept</Text>
      </Pressable>

      {session && (
        <>
          <Pressable
            style={({ pressed }) => [
              commonStyles.button,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Lägg till recept"
            onPress={() =>
              navigation.navigate("MainTabs", {
                screen: "RecipesTab",
                params: {
                  screen: "AddRecipe",
                },
              })
            }
          >
            <Text style={commonStyles.buttonText}>Lägg till recept</Text>
          </Pressable>

          <Pressable
            style={({ pressed }) => [
              styles.recipesButton,
              pressed && styles.buttonPressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="Logga ut"
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