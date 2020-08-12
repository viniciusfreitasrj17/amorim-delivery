import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {
  SimpleLineIcons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";

interface State {
  title: string;
  navigation?: any;
  menu?: boolean;
}

type Props = State;
// @ts-ignore
const TitleScreen: React.FC<Props> = ({ title, navigation, menu }) => {
  const [firstButton, setFirstButton] = useState();
  const [secondButton, setSecondButton] = useState();

  useEffect(() => {
    if (menu) {
      setFirstButton(
        //@ts-ignore
        <TouchableOpacity
          onPress={() => {
            navigation && navigation.toggleDrawer();
          }}
        >
          <SimpleLineIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      );
      setSecondButton(
        //@ts-ignore
        <TouchableOpacity
          onPress={() => {
            navigation && navigation.navigate("Search");
          }}
        >
          <Text>
            <FontAwesome name="search" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      );
    } else {
      setFirstButton(
        //@ts-ignore
        <TouchableOpacity
          onPress={() => {
            navigation && navigation.goBack();
          }}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      );
      setSecondButton(
        //@ts-ignore
        <TouchableOpacity>
          <SimpleLineIcons name="menu" size={24} color="transparent" />
        </TouchableOpacity>
      );
    }
  }, [title]);

  return (
    <View style={styles.container}>
      <View>{firstButton}</View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> {title} </Text>
      </View>

      <View>{secondButton}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 7,
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
  },
});

export default TitleScreen;
