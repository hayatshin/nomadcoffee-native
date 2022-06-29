import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
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
import AuthLayout from "../components/AuthLayout";

const SEE_ALL_COFFEESHOPS = gql`
  query seeCoffeeShops($offset: Int!) {
    seeCoffeeShops(offset: $offset) {
      name
      latitude
      longitude
      photo
      id
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
  useEffect(() => {
    refetch();
  }, []);
  const refresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };
  return (
    <View>
      <Header />
      <FlatList
        contentContainerStyle={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingBottom: 150,
        }}
        onEndReachedThreshold={0.3}
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
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
