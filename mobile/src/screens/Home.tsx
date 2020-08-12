import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  View,
  Image,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
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
          <TouchableOpacity style={{ marginVertical: 8 }}>
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
          </TouchableOpacity>
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

  const Promocao = ({ item }: { item: string }) => {
    return (
      <View>
        <View style={{ marginHorizontal: 5 }}>
          <TouchableOpacity style={{ marginVertical: 8 }}>
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
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const [foods, setFoods] = useState([
    {
      id: "0",
      name: "Calabresa",
      description: "aaa, vcsc, fsdf, fdsmkf, fnsdl, fds ",
      image:
        "https://blog.novasafra.com.br/wp-content/uploads/2016/01/accb7d_37d37d9f1001e88384dafc6e5cc60c4f.jpg_1024-780x450.jpg",
      stock: true,
      price: "35",
      category: {
        id: "5803d9d7-177f-4566-815b-e5ce4b7ee86f",
        name: "Pizza",
      },
    },
    {
      id: "1",
      name: "De Banana, 500ml",
      description: "aaa, vcsc, fsdf, fdsmkf, fnsdl, fds ",
      image:
        "https://t1.rg.ltmcdn.com/pt/images/9/8/9/vitamina_de_acai_com_leite_em_po_8989_paso_2_600.jpg",
      stock: true,
      price: "7",
      category: {
        id: "9eaf4cc6-1bb3-45e3-befa-77a79e432091",
        name: "Açaí",
      },
    },
    {
      id: "2",
      name: "X-Burguer",
      description: "aaa, vcsc, fsdf, fdsmkf, fnsdl, fds ",
      image: "https://zullalanches.com.br/wp-content/uploads/2019/06/9.jpg",
      stock: true,
      price: "10",
      category: {
        id: "dc74651c-6625-4fed-9c38-32a0a9f71a4a",
        name: "Hambúrguer",
      },
    },
  ]);

  interface FoodInterface {
    item: {
      id: string;
      name: string;
      description: string;
      image: string;
      stock: boolean;
      price: string;
      category: {
        id: string;
        name: string;
      };
    };
  } /*renderItem={({ item }) => <Text>{item.title}</Text>}*/

  const Food: React.FC<FoodInterface> = ({ item }) => {
    return (
      <View>
        <View
          style={{
            borderWidth: 1,
            margin: 10,
            padding: 2,
          }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginVertical: 5,
            }}
          >
            <View style={{ flex: 1 }}>
              <Text> {item.name} </Text>
              <Text> {item.description} </Text>
              <Text> {item.category.name} </Text>
              <Text> {item.price} </Text>
            </View>
            <View>
              <Image
                source={{ uri: item.image }}
                style={{
                  borderRadius: 5,
                  height: 120,
                  width: 120,
                  borderWidth: 1,
                  borderColor: "black",
                }}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Title title="Home" navigation={navigation} />
      <View style={{ height: "auto" }}>
        <View>
          <View style={{ height: "auto" }}>
            <FlatList
              ListHeaderComponent={
                <>
                  <Text style={stylesLocal.label}>Categorias</Text>

                  <View style={{ height: 140 }}>
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
                  </View>

                  <Text style={stylesLocal.label}>Promoções</Text>

                  <View style={{ height: 240 }}>
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
                  </View>

                  <Text style={stylesLocal.label}>Histórico</Text>

                  <View style={{ height: 140 }}>
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
                  </View>

                  <Text style={stylesLocal.label}>Produtos</Text>
                </>
              }
              data={foods}
              keyExtractor={(item, index) => index.toString()}
              renderItem={Food}
              ListFooterComponent={
                <View>
                  <TouchableOpacity
                    style={{
                      height: widthScreen * 0.3,
                      backgroundColor: "#BB1212",
                      width: "100%",
                      paddingTop: 25,
                      alignItems: "center",
                    }}
                  >
                    <Text>Ao Topo</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const stylesLocal = StyleSheet.create({
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 5,
  },
});

export default Home;
