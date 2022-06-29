import { gql, useMutation } from "@apollo/client";
import { ReactNativeFile } from "apollo-upload-client";
import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import {
  TouchableWithoutFeedback,
  TouchableOpacity,
  Keyboard,
  View,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import colors from "../colors";

const CREATE_COFFEESHOP_MUTATION = gql`
  mutation createCoffeeShop(
    $name: String!
    $latitude: String!
    $longitude: String!
    $photo: Upload
    $categories: String
  ) {
    createCoffeeShop(
      name: $name
      latitude: $latitude
      longitude: $longitude
      photo: $photo
      categories: $categories
    ) {
      ok
      error
    }
  }
`;

const Container = styled.View`
  flex: 1;
  background-color: ${colors.beige};
  padding: 0px 50px;
`;
const Photo = styled.Image`
  height: 300px;
`;
const CaptionContainer = styled.View`
  flex: 1;
  width: 100%;
`;

const Caption = styled.TextInput`
  padding: 10px 20px;
  height: 80px;
  background-color: ${colors.brown};
  border-radius: 8px;
  text-align: center;
  color: ${colors.beige};
  font-size: 18px;
  margin-bottom: 20px;
`;

const CaptionLocation = styled.TextInput`
  padding: 10px 20px;
  height: 80px;
  background-color: ${colors.brown};
  border-radius: 8px;
  text-align: center;
  color: ${colors.beige};
  font-size: 16px;
  width: 47%;
`;

const HeaderRightText = styled.Text`
  color: ${colors.darkBrown};
  font-size: 16px;
  font-weight: 600;
  padding-right: 30px;
`;

export default function UploadForm({ route, navigation }) {
  const onCompleted = () => {
    navigation.navigate("Tabs", { screen: "Home" });
  };
  const updateUploadPhoto = (cache, result) => {
    const {
      data: { createCoffeeShop },
    } = result;
    if (createCoffeeShop.error === "Please log in to perform this action") {
      alert(createCoffeeShop.error);
    }
    // if(createCoffeeShop.id) {
    //   cache.modify({
    //     id: `ROOT_QUERY` ---> 모든 쿼리가 가는 곳!
    //     fields: {
    //        seeFeed(prev) {
    //       return [createCoffeeShop, ...prev]
    // }
    // }
    //   })
    // }
  };
  const { register, handleSubmit, setValue } = useForm();
  const [createCoffeeShopMutation, { loading, data }] = useMutation(
    CREATE_COFFEESHOP_MUTATION,
    {
      update: updateUploadPhoto,
      onCompleted,
    }
  );
  const NameRef = useRef();
  const LatitudeRef = useRef();
  const LongitudeRef = useRef();
  const CategoryRef = useRef();
  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    console.log(data);
    const photo = new ReactNativeFile({
      uri: route.params.file,
      name: `1.jpg`,
      type: "image/jpeg",
    });
    createCoffeeShopMutation({
      variables: {
        name: data.name,
        latitude: data.latitude,
        longitude: data.longitude,
        photo,
        categories: data.categories,
      },
    });
  };
  const HeaderRight = () => (
    <TouchableOpacity onPress={handleSubmit(onValid)}>
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  const HeaderRightLoading = () => (
    <ActivityIndicator
      size="small"
      color={colors.darkBrown}
      style={{ marginRight: 30 }}
    ></ActivityIndicator>
  );
  useEffect(() => {
    register("name");
    register("latitude");
    register("longitude");
    register("categories");
  }, [register]);
  useEffect(() => {
    navigation.setOptions({
      headerRight: loading ? HeaderRightLoading : HeaderRight,
      ...(loading && { headerLeft: () => null }),
    });
  }, [loading]);

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <Container>
        <Photo resizeMode="contain" source={{ uri: route?.params?.file }} />
        <CaptionContainer>
          <Caption
            ref={NameRef}
            placeholder="CoffeeShop Name"
            placeholderTextColor={colors.beige}
            {...register("name", {
              required: "please enter Coffee Shop's Name.",
            })}
            onChangeText={(text) => setValue("name", text)}
            onSubmitEditing={() => onNext(LatitudeRef)}
          />
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <CaptionLocation
              ref={LatitudeRef}
              placeholder="Latitude"
              placeholderTextColor={colors.beige}
              {...register("latitude", {
                required: "please enter Coffee Shop's Latitude.",
              })}
              onChangeText={(text) => setValue("latitude", text)}
              onSubmitEditing={() => onNext(LongitudeRef)}
            />
            <CaptionLocation
              ref={LatitudeRef}
              placeholder="Longitude"
              placeholderTextColor={colors.beige}
              {...register("longitude", {
                required: "please enter Coffee Shop's Longitude.",
              })}
              onChangeText={(text) => setValue("longitude", text)}
              onSubmitEditing={() => onNext(CategoryRef)}
            />
          </View>
          <Caption
            ref={CategoryRef}
            placeholder="CoffeeShop Category"
            placeholderTextColor={colors.beige}
            {...register("categories", {
              required: "please enter Coffee Shop's Category.",
            })}
            onChangeText={(text) => setValue("categories", text)}
            onSubmitEditing={handleSubmit(onValid)}
          />
        </CaptionContainer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
