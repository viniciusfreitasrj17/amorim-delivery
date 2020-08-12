import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from "@react-navigation/drawer";

const CustomDrawer: React.FC<DrawerContentComponentProps> = (
  props: DrawerContentComponentProps
) => {
  return (
    <View style={styles.container}>
      <View style={styles.userArea}>
        {/* <Image source={require("../../assets/user.png")} style={styles.user} /> */}

        <Text style={styles.nome}>Marcos Vinícius</Text>
        <Text style={styles.email}>viniciusfreitasrj17@gmail.com</Text>
      </View>

      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="Home"
          onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
          label="Search"
          onPress={() => props.navigation.navigate("Search")}
        />
        <DrawerItem label="Help" onPress={() => {}} />
      </DrawerContentScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  userArea: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 10,
  },
  user: {
    width: 55,
    height: 55,
  },
  nome: {
    marginTop: 5,
    fontSize: 18,
    fontWeight: "bold",
  },
  email: { fontSize: 15 },
});

export default CustomDrawer;
