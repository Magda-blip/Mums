import { StyleSheet } from "react-native";
import { colours } from "../constants/Colours.js";
import { fonts } from "./Fonts";

export const commonStyles = StyleSheet.create({

  textBox: {
    backgroundColor: "rgba(197, 164, 109, 0.85)",
    paddingVertical: 50,
    paddingHorizontal: 40,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 150,
  },
  button: {
    backgroundColor: "rgba(197, 164, 109, 0.85)",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    minWidth: 180,
    alignSelf: "center",
    marginTop: 16,
  },

  buttonPressed: {
    opacity: 0.65,
  },

  title: {
    fontSize: 75,
    fontWeight: "bold",
    fontFamily: fonts.title,
    color: colours.pergament,
    marginBottom: 20,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
  },

  buttonText: {
    color: colours.pergament,
    fontSize: 18,
    fontWeight: "600",
    alignSelf: "center"
  },
  card: {
    backgroundColor: "rgba(197, 164, 109, 0.5)",
    paddingVertical: 50,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 20,
    marginHorizontal: 16,
  },

  titleTextBox: {
    backgroundColor: "rgba(182, 107, 75, 0.0)",
    paddingVertical: 2,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: fonts.title,
    color: colours.pergament,
    textAlign: "center",
    marginBottom: 50,
    // textShadowColor: "rgba(0, 0, 0, 0.7)",
    // textShadowOffset: { width: 2, height: 2 },
    //textShadowRadius: 4,
  },
  label: {
    fontSize: 20,
    fontFamily: fonts.title,
    fontWeight: "800",
    color: colours.pergament,
    marginBottom: 6,
    fontWeight: "bold",
  }



});