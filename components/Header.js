import React from "react";
import styled from "styled-components/native";
import { Text, View, Dimensions } from "react-native";
import colors from "../colors";
import { Feather } from "@expo/vector-icons";

const HeaderCup = styled.View`
  width: 100%;
  height: ${(props) => props.screenHeight * 0.14};
  display: flex;
  flex-direction: column;
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
        width: screenWidth,
        height: screenHeight,
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
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
    </View>
  );
}
