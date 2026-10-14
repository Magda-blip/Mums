
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";

export default function LoginScreen({ navigation }) {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Välkommen tillbaka!</Text>

        <Text style={styles.description}>
          Logga in för att komma åt dina recept.
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>E-post</Text>
          <TextInput
            style={styles.input}
            placeholder="din@email.se"
            placeholderTextColor={colours.darkBrown}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Lösenord</Text>
          <TextInput
            style={styles.input}
            placeholder="Ditt lösenord"
            placeholderTextColor={colours.darkBrown}
            secureTextEntry
          />

          <Pressable
            style={styles.button}
            onPress={() => console.log("Logga in")}
          >
            <Text style={styles.buttonText}>Logga in</Text>
          </Pressable>

          <Pressable
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Tillbaka</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colours.mint,
  },
  content: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 24,
  },
  title: {
    fontFamily: fonts.title,
    fontSize: 38,
    color: colours.bark,
    textAlign: "center",
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: colours.bark,
    textAlign: "center",
    marginBottom: 32,
  },
  form: {
    width: "100%",
    maxWidth: 420,
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: colours.bark,
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: colours.sage,
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    color: colours.bark,
    marginBottom: 18,
  },
  button: {
    backgroundColor: colours.sage,
    borderRadius: 12,
    padding: 15,
    alignItems: "center",
    marginTop: 8,
  },
  buttonText: {
    color: colours.bark,
    fontSize: 18,
    fontWeight: "600",
  },
  backButton: {
    alignItems: "center",
    padding: 14,
    marginTop: 8,
  },
  backButtonText: {
    color: colours.bark,
    fontSize: 16,
  },
});
