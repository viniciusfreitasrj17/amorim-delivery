import React from "react";
import { SafeAreaView, Text, Button } from "react-native";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const Home: React.FC<Props> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Title title="Home" />
      <Button
        title="Ir para as Demandas"
        onPress={() => navigation.navigate("Demands", { nome: "Marcos" })}
      />
    </SafeAreaView>
  );
};

export default Home;
