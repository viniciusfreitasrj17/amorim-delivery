import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Search from "../screens/Search";
import Demands from "../screens/Demands";

const Stack = createStackNavigator();

const screenOptionStyle = {
  title: "",
  headerStyle: { height: 0 },
};

const HomeStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={screenOptionStyle} />
      {/* <Stack.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          title: "",
          headerStyle: { height: 0 },
          headerBackImage: () => null,
        }}
      /> */}
    </Stack.Navigator>
  );
};

const DemandStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Pedido"
        component={Demands}
        options={screenOptionStyle}
      />
      {/* <Stack.Screen
        name="Search"
        component={SearchStackNavigator}
        options={{
          title: "",
          headerStyle: { height: 0 },
          headerBackImage: () => null,
        }}
      /> */}
    </Stack.Navigator>
  );
};

const SearchStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Home" component={Home} options={screenOptionStyle} /> */}
      <Stack.Screen
        name="Search"
        component={Search}
        options={{
          title: "",
          headerStyle: { height: 0 },
          headerBackImage: () => null,
        }}
      />
    </Stack.Navigator>
  );
};

export { HomeStackNavigator, DemandStackNavigator, SearchStackNavigator };
