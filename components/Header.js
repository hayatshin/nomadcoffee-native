import React from "react";
import styled from "styled-components/native";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import colors from "../colors";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const HeaderCup = styled.View`
  width: 100%;
  height: ${(props) => props.screenHeight * 0.14}px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.brown};
  box-sizing: border-box;
  padding: 5px;
`;

export default function Header() {
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const goBack = () => {
    navigation.goBack();
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <HeaderCup screenHeight={screenHeight}>
        <View style={{ height: screenHeight * 0.07 }}></View>
        <View
          style={{
            width: "43%",
            height: 40,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Feather
            style={{ color: colors.beige, fontSize: 40 }}
            name="coffee"
          />
          <Text style={{ color: colors.beige, fontSize: 20 }}>
            Nomad Coffee
          </Text>
        </View>
      </HeaderCup>

      <TouchableOpacity
        style={{ top: 20, left: 20, height: 60 }}
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
    </View>
  );
}
