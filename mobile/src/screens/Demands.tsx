import React from "react";
import { View, Text } from "react-native";
import { RootStackParamList } from "../../App";
import { RouteProp } from "@react-navigation/native";

type PerfilScreenRouteProp = RouteProp<RootStackParamList, "Demands">;

type Props = {
  route: PerfilScreenRouteProp;
};

const Demands: React.FC<Props> = ({ route }) => {
  return (
    <View>
      <Text>Meu nome é: {route.params?.nome} </Text>
    </View>
  );
};

export default Demands;
