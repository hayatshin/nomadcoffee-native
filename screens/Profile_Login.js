import { gql, useQuery, useReactiveVar } from "@apollo/client";
import React, { useEffect } from "react";
import { Text, View, Image, Dimensions } from "react-native";
import styled from "styled-components/native";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import colors from "../colors";
import AuthLayout from "../components/AuthLayout";
import Header from "../components/Header";

const ME_QUERY = gql`
  query me {
    me {
      username
      email
      location
      totalFollowers
      totalFollowing
      avatarURL
    }
  }
`;

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

export default function Profile_Login() {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const hasToken = useReactiveVar(isLoggedInVar);
  const loggedInUser = useUser();
  const { data, error } = useQuery(ME_QUERY, {
    skip: !hasToken,
  });
  return (
    <View>
      <Header />
      {/* name */}
      <View
        style={{
          // top: screenHeight * 0.14,
          display: "flex",
          flexDirection: "row",
          justifySelf: "start",
          width: "60%",
          height: screenHeight * 0.1,
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
          marginTop: 30,
        }}
      >
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 30,
            marginRight: 30,
          }}
          source={{ uri: data?.me?.avatarURL }}
        />
        <Text style={{ fontSize: 30 }}>{data?.me?.username}</Text>
      </View>
      {/* field */}
      <View
        style={{
          width: "100%",
          padding: 45,
          // top: screenHeight * 0.15,
          height: screenHeight * 0.76,
          display: "flex",
          flexDirection: "column",
          paddingVertical: 50,
          boxSizing: "border-box",
        }}
      >
        <View
          style={{
            backgroundColor: "#C2B099",
            padding: 20,
            borderRadius: 10,
            height: "85%",
          }}
        >
          <LABEL>EMAIL</LABEL>
          <FIELDTEXT>{data?.me?.email}</FIELDTEXT>
          <LABEL>LOCATION</LABEL>
          <FIELDTEXT>{data?.me?.location}</FIELDTEXT>
          <LABEL>TOTAL FOLLOWERS</LABEL>
          <FIELDTEXT>{data?.me?.totalFollowers}</FIELDTEXT>
          <LABEL>TOTAL FOLLOWING</LABEL>
          <FIELDTEXT>{data?.me?.totalFollowing}</FIELDTEXT>
        </View>
      </View>
    </View>
  );
}
