import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";

import { supabase } from "../lib/supabase";
import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";


export default function RegisterScreen({ navigation }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert(
        "Fyll i alla fält",
        "Du måste ange namn, e-post och lösenord."
      );
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: password,
        options: {
          data: {
            full_name: name.trim(),
          },
        },
      });

      if (error) {
        throw error;
      }

      if (data.session) {
        Alert.alert(
          "Konto skapat!",
          "Du är nu registrerad och inloggad."
        );
        navigation.navigate("Home");
      } else {
        Alert.alert(
          "Konto skapat!",
          "Kontrollera din e-post för att bekräfta kontot innan du loggar in."
        );
        navigation.navigate("Login");
      }
    } catch (error) {
      console.log("Fel vid registrering:", error);
      Alert.alert(
        "Kunde inte skapa konto",
        error.message
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >

        <ScrollView contentContainerStyle={styles.contentContainer}>
          <Text style={styles.title}>Bli medlem</Text>

          <Text style={styles.description}>Skapa ett konto för att hitta och samla mumsigheter!</Text>



          <View style={styles.form}>


            <Text style={styles.label}>Namn</Text>

            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Namn"
              placeholderTextColor={colours.bark}
              autoCapitalize="words"
              accessibilityLabel="Namn"
              accessibilityHint="Ange ditt namn"
            />

            <Text style={styles.label}>E-post</Text>

            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="E-post"
              placeholderTextColor={colours.bark}
              keyboardType="email-address"
              autoCapitalize="none"
              accessibilityLabel="E-post"
              accessibilityHint="Ange din e-postadress"
            />

            <Text style={styles.label}>Lösenord</Text>

            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Lösenord"
              placeholderTextColor={colours.bark}
              secureTextEntry
              accessibilityLabel="Lösenord"
              accessibilityHint="Ange ett lösenord"
            />


            <Pressable
              style={styles.button}
              accessibilityRole="button"
              accessibilityLabel={
                loading ? "Skapar konto" : "Skapa konto"
              }
              onPress={handleRegister}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? "Skapar konto..." : "Skapa konto"}
              </Text>
            </Pressable>


            <Pressable
              style={styles.backButton}
              accessibilityRole="button"
              accessibilityLabel="Gå tillbaka"
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.backButtonText}>Tillbaka</Text>
            </Pressable>




          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
    fontSize: 42,
    color: colours.bark,
    textAlign: "center",
    marginBottom: 8,
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