import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import Header from "../components/Header";
import colors from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import CafeCard from "../components/CafeCard";

const FIELDTEXT = styled.Text`
  color: ${colors.darkBrown};
  font-size: 17px;
  margin-bottom: 30px;
`;

export default function CafeList({ route }) {
  const [refreshing, setRefreshing] = useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (route?.params?.cafeArray) {
      setLoading(true);
    }
  }, [route]);

  const dataExist = route?.params?.cafeArray.length !== 0;
  return loading ? (
    <View style={{ flex: 1 }}>
      <Header />
      <View
        style={{
          width: "100%",
          height: "100%",
          top: 17,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {dataExist ? (
          <FlatList
            data={route?.params?.cafeArray}
            renderItem={CafeCard}
            keyExtractor={(item) => item.name}
          />
        ) : (
          <View
            style={{
              width: "100%",
              height: "100%",
              top: screenHeight * 0.14,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FIELDTEXT>There's no Coffee Shop with this keyword.</FIELDTEXT>
          </View>
        )}
      </View>
    </View>
  ) : (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color={colors.brown} />
    </View>
  );
}
