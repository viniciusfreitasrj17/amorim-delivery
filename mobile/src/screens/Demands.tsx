import React from "react";
import { SafeAreaView, Text } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { RootStackParamList } from "../../App";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

type PerfilScreenRouteProp = RouteProp<RootStackParamList, "Demands">;

type Props = {
  route: PerfilScreenRouteProp;
};

const Demands: React.FC<Props> = ({ route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Pedidos" />
      <Text>Meu nome é: {route.params?.nome} </Text>
    </SafeAreaView>
  );
};

export default Demands;
