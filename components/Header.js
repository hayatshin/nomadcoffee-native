import React from "react";
import styled from "styled-components/native";
import { Text, View, Dimensions, TouchableOpacity } from "react-native";
import colors from "../colors";
import { Feather } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";

const HeaderCup = styled.View`
  width: 100%;
  height: ${(props) => props.screenHeight * 0.12}px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${colors.brown};
  box-sizing: border-box;
  padding: 5px;
`;

export default function Header() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
      }}
    >
      <HeaderCup style={{ paddingTop: 45 }} screenHeight={screenHeight}>
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
    </View>
  );
}
