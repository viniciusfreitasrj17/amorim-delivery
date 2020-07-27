import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

interface State {
  title: string;
}

type Props = State;

const TitleScreen: React.FC<Props> = ({ title }) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity>
          <SimpleLineIcons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}> {title} </Text>
      </View>

      <View>
        <SimpleLineIcons name="menu" size={24} color="transparent" />
      </View>
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
