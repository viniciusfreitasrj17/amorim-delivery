import React from "react";
import { SafeAreaView, Text } from "react-native";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

const Search: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Busca" />
    </SafeAreaView>
  );
};

export default Search;
