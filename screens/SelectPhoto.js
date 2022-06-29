import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import Ionicons from "react-native-vector-icons/Ionicons";
import styled from "styled-components/native";
import {
  FlatList,
  Image,
  StatusBar,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import colors from "../colors";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.darkBrown};
`;

const Top = styled.View`
  flex: 1;
  background-color: ${colors.darkBrown};
`;

const Bottom = styled.View`
  flex: 1;
  background-color: ${colors.darkBrown};
`;

const ImageContainer = styled.TouchableOpacity``;

const IconContainer = styled.View`
  position: absolute;
  bottom: 5px;
  right: 0px;
`;

const HeaderRightText = styled.Text`
  color: ${colors.darkBrown};
  font-size: 16px;
  font-weight: 600;
  padding-right: 30px;
`;

export default function SelectPhoto({ navigation }) {
  const [ok, setOk] = useState(false);
  const [photos, setPhotos] = useState([]);
  const [chosenPhoto, setChosenPhoto] = useState("");
  const getPhotos = async () => {
    const { assets: photos } = await MediaLibrary.getAssetsAsync({
      sortBy: "creationTime",
      first: 50,
    });
    setPhotos(photos);
    setChosenPhoto(photos[0]?.uri);
  };
  const getPermissions = async () => {
    const { canAskAgain } = await MediaLibrary.getPermissionsAsync();
    const requestPermission = await MediaLibrary.requestPermissionsAsync();
    console.log(requestPermission);
    if (canAskAgain) {
      setOk(true);
      getPhotos();
    }
  };

  const HeaderRight = () => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("UploadForm", {
          file: chosenPhoto,
        })
      }
    >
      <HeaderRightText>Next</HeaderRightText>
    </TouchableOpacity>
  );
  useEffect(() => {
    getPermissions();
  }, []);
  useEffect(() => {
    navigation.setOptions({
      headerRight: HeaderRight,
    });
  }, [chosenPhoto]);
  const numColumns = 4;
  const { width } = useWindowDimensions();
  const choosePhoto = (uri) => {
    setChosenPhoto(uri);
  };
  const renderItem = ({ item: photo }) => (
    <ImageContainer onPress={() => choosePhoto(photo.uri)}>
      <Image
        style={{ width: width / numColumns, height: 100 }}
        source={{ uri: photo.uri }}
      />
      <IconContainer>
        <Ionicons
          name="checkmark-circle"
          size={18}
          color={photo.uri === chosenPhoto ? colors.brown : colors.beige}
        />
      </IconContainer>
    </ImageContainer>
  );
  return (
    <Container>
      <StatusBar hidden={false} />
      <Top>
        {chosenPhoto !== "" ? (
          <Image
            source={{ uri: chosenPhoto }}
            style={{ width, height: "100%" }}
          />
        ) : null}
      </Top>
      <Bottom>
        <FlatList
          data={photos}
          numColumns={4}
          keyExtractor={(photo) => photo.id}
          renderItem={renderItem}
        />
      </Bottom>
    </Container>
  );
}
