import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";
import { styles } from "../styles/global";
import Title from "../components/TitleScreen";

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  navigation: HomeScreenNavigationProp;
};

const widthScreen = Dimensions.get("window").width;

const Home: React.FC<Props> = ({ navigation }) => {
  const [categories, setCategories] = useState([
    {
      id: "0",
      image:
        "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0R0f000010ZDNXEA4/5c001711e4b00010cfa42363.jpg&w=710&h=462",
    },
    {
      id: "1",
      image:
        "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0R6f00001FmkNhEAJ/5dc309ade4b07ac80d7dae44.jpg&w=710&h=462",
    },
    {
      id: "2",
      image:
        "https://p2.trrsf.com/image/fget/cf/940/0/images.terra.com/2018/04/21/salada.jpg",
    },
    {
      id: "3",
      image:
        "https://img.stpu.com.br/?img=https://s3.amazonaws.com/pu-mgr/default/a0R0f0000104ViYEAU/5b9fb978e4b08525cc8ea2f0.jpg&w=710&h=462",
    },
    {
      id: "4",
      image:
        "https://odia.ig.com.br/_midias/jpg/2019/11/26/700x930/1_churrasco-14468349.jpg",
    },
    {
      id: "5",
      image:
        "https://oceandrop.s3.sa-east-1.amazonaws.com/2019/09/a%C3%A7ai-2.jpg",
    },
    {
      id: "6",
      image:
        "https://www.zappas.com.br/wp-content/uploads/2020/04/Suco-de-Laranja-1.jpg",
    },
  ]);

  const Category = ({ item }: { item: { image: string } }) => {
    return (
      <View>
        <View style={{ marginHorizontal: 15 }}>
          <Image
            source={{ uri: item.image }}
            style={{
              borderRadius: 50,
              height: 100,
              width: 100,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        </View>
      </View>
    );
  };

  const Promocao = ({ item }: { item: string }) => {
    return (
      <View>
        <View style={{ marginHorizontal: 5 }}>
          <Image
            source={{ uri: item }}
            style={{
              borderRadius: 5,
              height: 200,
              width: widthScreen - 10,
              borderWidth: 1,
              borderColor: "black",
            }}
          />
        </View>
      </View>
    );
  };

  const [promo, setPromo] = useState([
    "http://tutofox.com/foodapp//banner/banner-1.jpg",
    "http://tutofox.com/foodapp//banner/banner-2.jpg",
    "http://tutofox.com/foodapp//banner/banner-3.png",
  ]);

  const [activeIndexPromo, setActiveIndexPromo] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Home" navigation={navigation} />

      <Text>Categorias</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        legacyImplementation={false}
        data={categories}
        keyExtractor={(item) => item.id}
        renderItem={Category}
        contentContainerStyle={{
          justifyContent: "center",
          flexDirection: "row",
          paddingVertical: 15,
        }}
      />

      <Text>Promoção</Text>

      <Carousel
        layout={"default"}
        ref={(ref) => ref}
        data={promo}
        sliderWidth={widthScreen - 5}
        itemWidth={widthScreen}
        renderItem={Promocao}
        onSnapToItem={(index) => setActiveIndexPromo(index)}
        autoplay={true}
        enableMomentum={false}
        lockScrollWhileSnapping={false}
        autoplayInterval={3000}
        slideStyle={{
          justifyContent: "center",
          flexDirection: "row",
          paddingVertical: 15,
        }}
      />
    </SafeAreaView>
  );
};

export default Home;
