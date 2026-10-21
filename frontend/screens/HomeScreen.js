
import { View, Text, StyleSheet, Pressable } from "react-native";
import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

export default function HomeScreen({ navigation }) {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mums</Text>

      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && styles.loginButtonPressed,
        ]}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginButtonText}>Logga in</Text>
      </Pressable>



      <Pressable
        style={({ pressed }) => [
          styles.registerButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.registerButtonText}>Skapa konto</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.RecipesButton,
          pressed && styles.RecipesButtonPressed,
        ]}
        onPress={() => navigation.navigate("Recipes")}
      >
        <Text style={styles.RecipesButtonText}>Visa recept</Text>
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          styles.RecipesButton,
          pressed && styles.buttonPressed,
        ]}
        onPress={() => navigation.navigate("AddRecipe")}
      >
        <Text style={styles.RecipesButtonText}>Lägg till recept</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.vin,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 56,
    fontFamily: fonts.title,
    color: colours.guld,
    marginBottom: 48,
  },
  loginButton: {
    backgroundColor: colours.terrakotta,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
  },
  buttonPressed: {
    color: colours.vin,
    opacity: 0.75,
  },
  loginButtonText: {
    color: colours.bark,
    fontSize: 18,
    fontWeight: "600",
  },

  registerButton: {
    backgroundColor: colours.beige,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
    marginTop: 16,
  },
  registerButtonText: {
    color: colours.skog,
    fontSize: 18,
    fontWeight: "600",
  },
  RecipesButton: {
    backgroundColor: colours.pergament,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
    marginTop: 16,
  },
  RecipesButtonText: {
    color: colours.skog,
    fontSize: 18,
    fontWeight: "600",
  },

});
