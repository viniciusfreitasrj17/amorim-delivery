import React from "react";
import { SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

type DetailsScreenRouteProp = StackNavigationProp<
  RootStackParamList,
  "Details"
>;

type Props = {
  navigation: DetailsScreenRouteProp;
};

const Details: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Detalhes" navigation={navigation} menu={false} />
      {/* <Text>Meu nome é: {route.params?.name} </Text> */}
    </SafeAreaView>
  );
};

export default Details;
