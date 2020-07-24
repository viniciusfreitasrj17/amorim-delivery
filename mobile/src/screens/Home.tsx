import React from "react";
import { View, Text, Button } from "react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="Ir para as Demandas"
        onPress={() => navigation.navigate("Demands", { nome: "Marcos" })}
      />
    </View>
  );
};

export default Home;
