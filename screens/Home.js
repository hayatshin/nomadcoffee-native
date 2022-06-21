import React, { useEffect, useRef } from "react";
import {
  Animated,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  Easing,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../colors";
import styled from "styled-components/native";
import { gql, useLazyQuery } from "@apollo/client";
import AuthLayout from "../components/AuthLayout";
import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

const SEE_COFEEE_QUERY = gql`
  query seeCoffeeShop($keyword: String!) {
    seeCoffeeShop(keyword: $keyword) {
      name
      latitude
      longitude
      photo
    }
  }
`;

const CoffeeForm = styled.View`
  background-color: rgba(212, 160, 125, 0.8);
  padding: 5px;
  width: ${(props) => props.screenWidth * 0.7}px;
  height: ${(props) => props.screenHeight * 0.5}px;
  border-radius: 20px;
  align-self: center;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border-color: ${colors.darkBrown};
  border-width: 8px;
`;

const AnimatedCoffeeForm = Animated.createAnimatedComponent(CoffeeForm);

const CoffeeText = styled.TextInput`
  background-color: ${colors.beige};
  width: 90%;
  height: 40%;
  font-size: 18px;
  text-align: center;
  border-radius: 15px;
`;

export default function Home() {
  useEffect(() => {
    setTimeout(() => {
      goDownY.start();
    }, 2000);
  }, []);
  const navigation = useNavigation();
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const { register, setValue, handleSubmit } = useForm();
  const [seeCoffeeShopQuery, { data, loading }] =
    useLazyQuery(SEE_COFEEE_QUERY);
  const onValid = async (keyword) => {
    Keyboard.dismiss();
    if (!loading) {
      seeCoffeeShopQuery({
        variables: {
          keyword: keyword?.cafekeyword + "",
        },
      }).then((data) => {
        navigation.navigate("CafeList", {
          cafeArray: data?.data?.seeCoffeeShop,
        });
      });
    }
  };
  const animateY = useRef(new Animated.Value(-700)).current;
  const goDownY = Animated.spring(animateY, {
    toValue: 30,
    duration: 800,
    easing: Easing.linear,
    bounciness: 10,
    useNativeDriver: true,
  });
  const scaleBig = animateY.interpolate({
    inputRange: [-700, 0, 40],
    outputRange: [0, 0.7, 1],
    extrapolate: "clamp",
  });
  const navToAllList = () => {
    navigation.navigate("AllCafeList");
  };
  return (
    <AuthLayout>
      <AnimatedCoffeeForm
        style={{ transform: [{ scale: scaleBig }, { translateY: animateY }] }}
        screenWidth={screenWidth}
        screenHeight={screenHeight}
      >
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
      </AnimatedCoffeeForm>
      <TouchableOpacity
        onPress={navToAllList}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 50,
        }}
      >
        <Ionicons
          style={{ fontSize: 25, marginRight: 10, color: colors.brown }}
          name="md-arrow-forward"
        ></Ionicons>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            color: colors.brown,
          }}
        >
          See All Cafe List
        </Text>
      </TouchableOpacity>
    </AuthLayout>
  );
}
