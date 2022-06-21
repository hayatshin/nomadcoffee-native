import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";
import Header from "../components/Header";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import CafeCard from "../components/CafeCard";

const SEE_ALL_COFFEESHOPS = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      name
      latitude
      longitude
      photo
    }
  }
`;

export default function AllCafeList() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch, fetchMore } = useQuery(SEE_ALL_COFFEESHOPS, {
    variables: {
      offset: 0,
    },
  });
  const goBack = () => {
    navigation.goBack();
  };
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <View
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Header />
      <FlatList
        onEndReachedThreshold={0.05}
        onEndReached={() =>
          fetchMore({
            variables: {
              offset: data?.seeCoffeeShops?.length,
            },
          })
        }
        refreshing={refreshing}
        onRefresh={refresh}
        data={data?.seeCoffeeShops}
        renderItem={CafeCard}
        keyExtractor={(item) => item.name}
        showsVerticalScrollIndicator={false}
      />
      {/* </View> */}
    </View>
  );
}
