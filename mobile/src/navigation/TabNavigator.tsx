import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  Ionicons,
  MaterialCommunityIcons,
  // AntDesign,
  // FontAwesome,
} from "@expo/vector-icons";

import { HomeStackNavigator, DemandStackNavigator } from "./StackNavigator";

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
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
            // } else if (route.name === "Search") {
            //   if (focused) {
            //     return <FontAwesome name="search" size={size} color={color} />;
            //   } else {
            //     return <AntDesign name="search1" size={size} color={color} />;
            //   }
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
        component={HomeStackNavigator}
        options={{ tabBarLabel: "Início" }}
      />
      <Tab.Screen
        name="Demands"
        component={DemandStackNavigator}
        options={{ tabBarLabel: "Pedido" }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
