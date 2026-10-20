
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

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.mint,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 56,
    fontFamily: fonts.title,
    color: colours.bark,
    marginBottom: 48,
  },
  loginButton: {
    backgroundColor: colours.sage,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
  },
  buttonPressed: {
    color: colours.mint,
    opacity: 0.75,
  },
  loginButtonText: {
    color: colours.bark,
    fontSize: 18,
    fontWeight: "600",
  },

  registerButton: {
    backgroundColor: colours.grass,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
    marginTop: 16,
  },
  registerButtonText: {
    color: colours.bark,
    fontSize: 18,
    fontWeight: "600",
  },
  RecipesButton: {
    backgroundColor: colours.camel,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignItems: "center",
    marginTop: 16,
  },
  RecipesButtonText: {
    color: colours.bark,
    fontSize: 18,
    fontWeight: "600",
  },

});
