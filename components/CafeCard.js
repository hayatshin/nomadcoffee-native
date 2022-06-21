import React from "react";
import styled from "styled-components/native";
import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import colors from "../colors";

const LABEL = styled.Text`
  color: ${colors.lightBrown};
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
`;

const FIELDTEXT = styled.Text`
  color: ${colors.darkBrown};
  font-size: 17px;
`;

export default function CafeCard({ item }) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        padding: 10,
        borderRadius: 10,
        width: 350,
        height: 150,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(141, 102, 66, 0.7)",
        marginTop: 20,
      }}
    >
      {/* Background */}
      <Image
        style={{ width: 130, height: 100, borderRadius: 20, marginRight: 50 }}
        source={{ uri: item.photo }}
      />
      {/* <ImageBackground
          style={{
            width: "100%",
            height: "100%",
          }}
          imageStyle={{
            borderRadius: 20,
            opacity: 0.3,
          }}
          resizeMode="contain"
          source={{ uri: item.photo }}
        /> */}
      {/* Text */}
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FIELDTEXT style={{ fontSize: 23, fontWeight: "600" }}>
          {item?.name}
        </FIELDTEXT>
        <View style={{ display: "flex", flexDirection: "row", marginTop: 20 }}>
          <LABEL>Latitude</LABEL>
          <FIELDTEXT>{item?.latitude}</FIELDTEXT>
        </View>
        <View style={{ display: "flex", flexDirection: "row" }}>
          <LABEL>Logitude</LABEL>
          <FIELDTEXT>{item?.longitude}</FIELDTEXT>
        </View>
      </View>
    </View>
  );
}
