import React from "react";
import { SafeAreaView, Text } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

type DemandScreenRouteProp = StackNavigationProp<RootStackParamList, "Demands">;

type Props = {
  navigation: DemandScreenRouteProp;
};

const Demands: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Pedidos" navigation={navigation} />
      {/* <Text>Meu nome é: {route.params?.nome} </Text> */}
    </SafeAreaView>
  );
};

export default Demands;
