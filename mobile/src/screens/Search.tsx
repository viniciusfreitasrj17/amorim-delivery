import React from "react";
import { SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

type SearchScreenRouteProp = StackNavigationProp<RootStackParamList, "Search">;

type Props = {
  navigation: SearchScreenRouteProp;
};

const Search: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Busca" navigation={navigation} />
      {/* <Text>Meu nome é: {route.params?.name} </Text> */}
    </SafeAreaView>
  );
};

export default Search;
