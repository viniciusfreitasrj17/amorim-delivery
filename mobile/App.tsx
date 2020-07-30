import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./src/navigation/DrawerNavigator";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Demands: undefined;
  // TitleScreem: undefined;
};

export default function App() {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
}
