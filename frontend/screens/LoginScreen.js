
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

import { supabase } from "../lib/supabase";
import { useState } from "react";
import { Alert } from "react-native";

import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";
import { commonStyles } from "../constants/CommonStyles.js";
import ScreenBackground from "../components/ScreenBackground.js";

export default function LoginScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: password,
    });

    if (error) {
      Alert.alert("Kunde inte logga in", error.message);
      return;
    }

    Alert.alert("Inloggad!", "Du har loggat in.");
    navigation.navigate("Home");
  }

  return (

    <ScreenBackground>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={commonStyles.title}>Välkommen tillbaka!</Text>

          <Text style={commonStyles.subtitle}>
            Logga in för att komma åt dina recept.
          </Text>

          <View style={styles.form}>
            <Text style={commonStyles.label}>E-post</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="din@email.se"
              placeholderTextColor={colours.darkBrown}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={commonStyles.label}>Lösenord</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Ditt lösenord"
              placeholderTextColor={colours.darkBrown}
              secureTextEntry
            />

            <Pressable
              style={commonStyles.button}
              onPress={handleLogin}
            >
              <Text style={commonStyles.buttonText}>Logga in</Text>
            </Pressable>

            <Pressable
              style={commonStyles.button}
              onPress={() => navigation.goBack()}
            >
              <Text style={commonStyles.buttonText}>Tillbaka</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenBackground>
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
