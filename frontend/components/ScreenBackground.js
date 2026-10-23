import { ImageBackground, View, StyleSheet } from "react-native";

export default function ScreenBackground({ children }) {
  return (
    <ImageBackground
      source={require("../assets/images/background_mums.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    //backgroundColor: "rgba(232, 216, 184, 0.2)",
  },
});