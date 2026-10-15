import {
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  SafeAreaView,
} from "react-native";
import { colours } from "../constants/Colours.js";
import { fonts } from "../constants/Fonts.js";


export default function RegisterScreen({ navigation }) {

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
              placeholder="Namn"
              placeholderTextColor={colours.bark}
              autoCapitalize="words"
            />

            <Text style={styles.label}>E-post</Text>

            <TextInput
              style={styles.input}
              placeholder="E-post"
              placeholderTextColor={colours.bark}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.label}>Lösenord</Text>

            <TextInput
              style={styles.input}
              placeholder="Lösenord"
              placeholderTextColor={colours.bark}
              secureTextEntry
            />


            <Pressable
              style={styles.button}
              onPress={() => console.log("Registrera")}
            >
              <Text style={styles.buttonText}>Skapa konto</Text>
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