import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  FontAwesome,
} from "@expo/vector-icons";

import Home from "./src/screens/Home";
import Search from "./src/screens/Search";
import Demands from "./src/screens/Demands";

export type RootStackParamList = {
  Home: undefined;
  Search: undefined;
  Demands: { nome: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const Tabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        if (route.name === "Home") {
          if (focused) {
            return (
              <MaterialCommunityIcons name="home" size={size} color={color} />
            );
          } else {
            return (
              <MaterialCommunityIcons
                name="home-outline"
                size={size}
                color={color}
              />
            );
          }
        } else if (route.name === "Search") {
          if (focused) {
            return <FontAwesome name="search" size={size} color={color} />;
          } else {
            return <AntDesign name="search1" size={size} color={color} />;
          }
        } else if (route.name === "Demands") {
          if (focused) {
            return <Ionicons name="ios-list-box" size={size} color={color} />;
          } else {
            return <Ionicons name="ios-list" size={size} color={color} />;
          }
        }
        // You can return any component that you like here!
      },
    })}
    tabBarOptions={{
      activeTintColor: "tomato",
      inactiveTintColor: "gray",
    }}
  >
    <Tab.Screen
      name="Home"
      component={Home}
      options={{ tabBarLabel: "Início" }}
    />
    <Tab.Screen
      name="Search"
      component={Search}
      options={{ tabBarLabel: "Busca" }}
    />
    <Tab.Screen
      name="Demands"
      component={Demands}
      options={{ tabBarLabel: "Pedidos" }}
    />
    {
      // You can return any component that you like here!
    }
  </Tab.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Tabs}
          options={{
            title: "",
            headerStyle: { height: 0 },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
