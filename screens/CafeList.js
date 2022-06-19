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

const LABEL = styled.Text`
  color: ${colors.lightBrown};
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 10px;
`;

const FIELDTEXT = styled.Text`
  color: ${colors.darkBrown};
  font-size: 17px;
  margin-bottom: 30px;
`;

export default function CafeList({ route }) {
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (route?.params?.cafeArray) {
      setLoading(true);
    }
  }, [route]);
  const goBack = () => {
    navigation.goBack();
  };

  const FlatCard = ({ item }) => (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#C2B099",
        padding: 10,
        borderRadius: 10,
        marginTop: 35,
        width: 300,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <FIELDTEXT style={{ fontSize: 23, fontWeight: "600" }}>
        {item?.name}
      </FIELDTEXT>
      <View style={{ display: "flex", flexDirection: "row" }}>
        <LABEL style={{ marginRight: 10 }}>Latitude</LABEL>
        <FIELDTEXT>{item?.latitude}</FIELDTEXT>
        <View style={{ width: 30 }}></View>
        <LABEL style={{ marginRight: 10 }}>Logitude</LABEL>
        <FIELDTEXT>{item?.longitude}</FIELDTEXT>
      </View>
    </View>
  );
  const dataExist = route?.params?.cafeArray.length !== 0;

  return loading ? (
    <View style={{ flex: 1 }}>
      <Header />
      <TouchableOpacity
        style={{ top: screenHeight * 0.16, left: 20 }}
        onPress={goBack}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Ionicons
            style={{
              fontSize: 20,
              marginRight: 10,
              color: colors.brown,
            }}
            name="arrow-back"
          />
          <Text style={{ fontSize: 20, color: colors.brown }}>Go back</Text>
        </View>
      </TouchableOpacity>
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
        {dataExist ? (
          <FlatList
            data={route?.params?.cafeArray}
            renderItem={FlatCard}
            keyExtractor={(item) => item.id}
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
