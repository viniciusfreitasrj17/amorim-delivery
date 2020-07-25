import { StyleSheet, Platform } from "react-native";

export const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? 25 : 0,
  },
});
