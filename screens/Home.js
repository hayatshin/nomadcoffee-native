import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Keyboard,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../colors";
import styled from "styled-components/native";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";

const SEE_COFEEE_QUERY = gql`
  query seeCoffeeShops($keyword: String!, $page: Int!) {
    seeCoffeeShops(keyword: $keyword, page: $page) {
      name
      latitude
      longitude
    }
  }
`;

const CoffeeForm = styled.View`
  background-color: rgba(212, 160, 125, 0.8);
  padding: 5px;
  width: ${(props) => props.screenWidth * 0.7};
  height: ${(props) => props.screenHeight * 0.5};
  border-radius: 20px;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-color: ${colors.darkBrown};
  border-width: 8px;
`;

const CoffeeText = styled.TextInput`
  background-color: ${colors.beige};
  width: 90%;
  height: 40%;
  font-size: 18px;
  text-align: center;
  border-radius: 15px;
`;

export default function Home() {
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const { register, setValue, handleSubmit } = useForm();
  const [seeCoffeeShopQuery, { data, loading }] =
    useLazyQuery(SEE_COFEEE_QUERY);
  const onValid = (keyword) => {
    Keyboard.dismiss();
    if (!loading) {
      seeCoffeeShopQuery({
        variables: {
          keyword: keyword.cafekeyword + "",
          page: 1,
        },
      });
      navigation.navigate("CafeList", {
        cafeArray: data?.seeCoffeeShops,
      });
    }
  };
  return (
    <AuthLayout>
      <CoffeeForm screenWidth={screenWidth} screenHeight={screenHeight}>
        <Feather
          style={{
            color: colors.darkBrown,
            fontSize: 120,
          }}
          name="coffee"
        />
        <View
          style={{
            width: "100%",
            height: "40%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CoffeeText
            {...register("cafekeyword", {
              required: "please enter coffeeshop keyword.",
            })}
            placeholder="Type Coffee Shop Keyword"
            placeholderTextColor={colors.darkBrown}
            onChangeText={(text) => setValue("cafekeyword", text)}
            autoCapitalize="none"
          />
          <TouchableOpacity
            onPress={handleSubmit(onValid)}
            style={{
              marginTop: 30,
              backgroundColor: colors.darkBrown,
              width: "50%",
              height: "30%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "800", color: colors.beige }}
            >
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </CoffeeForm>
    </AuthLayout>
  );
}
