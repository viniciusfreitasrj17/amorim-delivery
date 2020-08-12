import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import { SearchStackNavigator, DetailsStackNavigator } from "./StackNavigator";
import TabNavigator from "./TabNavigator";
import CustomDrawer from "../components/CustomDrawer";

const Drawer = createDrawerNavigator();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={CustomDrawer}>
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="Search" component={SearchStackNavigator} />
      <Drawer.Screen name="Details" component={DetailsStackNavigator} />
    </Drawer.Navigator>
  );
};

export default DrawerNavigator;
