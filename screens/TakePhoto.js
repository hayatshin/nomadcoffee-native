import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components/native";
import colors from "../colors";
import { Camera } from "expo-camera";
import { Alert, Image, StatusBar, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Slider from "@react-native-community/slider";
import * as MediaLibrary from "expo-media-library";
import { useIsFocused } from "@react-navigation/native";

const Container = styled.View`
  flex: 1;
  background-color: ${colors.darkBrown};
`;

const Actions = styled.View`
  flex: 0.35;
  padding: 0px 50px;
  align-items: center;
  justify-content: space-around;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TakePhotoBtn = styled.TouchableOpacity`
  width: 85px;
  height: 85px;
  background-color: ${colors.beige};
  border-radius: 50px;
  opacity: 0.5;
  border: 8px solid ${colors.brown};
`;

const SliderContainer = styled.View``;

const ActionsContainer = styled.View`
  flex-direction: row;
`;

const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const PhotoAction = styled.TouchableOpacity`
  background-color: ${colors.beige};
  padding: 5px 10px;
  border-radius: 4px;
`;

const PhotoActionText = styled.Text`
  font-weight: 600;
`;

export default function TakePhoto({ navigation }) {
  const camera = useRef();
  const [takenPhoto, setTakenPhoto] = useState("");
  const [cameraReady, setCameraReady] = useState(false);
  const [ok, setOk] = useState(false);
  const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);
  const [zoom, setZoom] = useState(0);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
  const getPermissions = async () => {
    const { granted } = await Camera.requestCameraPermissionsAsync();
    setOk(granted);
  };
  useEffect(() => {
    getPermissions();
  }, []);
  const onCameraSwitch = () => {
    if (cameraType === Camera.Constants.Type.front) {
      setCameraType(Camera.Constants.Type.back);
    } else {
      setCameraType(Camera.Constants.Type.front);
    }
  };
  const onValueChange = (e) => {
    setZoom(e);
  };
  const onFlashChange = () => {
    if (flashMode === Camera.Constants.FlashMode.off) {
      setFlashMode(Camera.Constants.FlashMode.on);
    } else if (flashMode === Camera.Constants.FlashMode.on) {
      setFlashMode(Camera.Constants.FlashMode.auto);
    } else if (flashMode === Camera.Constants.FlashMode.auto) {
      setFlashMode(Camera.Constants.FlashMode.off);
    }
  };
  const goToUpload = async (save) => {
    if (save) {
      await MediaLibrary.saveToLibraryAsync(takenPhoto);
    }
    navigation.navigate("UploadForm", {
      file: takenPhoto,
    });
    console.log("will upload", takenPhoto);
  };
  const onUpload = () => {
    Alert.alert("Save Photo?", "Save Photo & Upload or just upload", [
      { text: "Save & Upload", onPress: () => goToUpload(true) },
      { text: "Just Upload", onPress: () => goToUpload(false) },
    ]);
  };
  const onCameraReady = () => {
    setCameraReady(true);
  };
  const takePhoto = async () => {
    if (camera.current && cameraReady) {
      const { uri } = await camera.current.takePictureAsync({
        quality: 1,
        exif: true,
      });
      setTakenPhoto(uri);
    }
  };
  const onDismiss = () => setTakenPhoto("");
  const isFocused = useIsFocused();
  return (
    <Container>
      {isFocused ? <StatusBar hidden={true} /> : null}
      {takenPhoto === "" ? (
        <Camera
          type={cameraType}
          style={{ flex: 1 }}
          zoom={zoom}
          flashMode={flashMode}
          ref={camera}
          onCameraReady={onCameraReady}
        >
          <CloseButton onPress={() => navigation.goBack()}>
            <Ionicons name="close" color={colors.beige} size={30} />
          </CloseButton>
        </Camera>
      ) : (
        <Image
          source={{ uri: takenPhoto }}
          style={{ flex: 1, transform: [{ rotate: "270deg" }] }}
        />
      )}
      {takenPhoto === "" ? (
        <Actions>
          <SliderContainer>
            <Slider
              style={{ width: 200, height: 40 }}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="#FFFFFF"
              maximumTrackTintColor="rgba(255, 255, 255, 0.5)"
              onValueChange={onValueChange}
            />
          </SliderContainer>
          <ButtonsContainer>
            <TouchableOpacity onPress={onFlashChange}>
              <Ionicons
                size={30}
                color={colors.beige}
                name={
                  flashMode === Camera.Constants.FlashMode.off
                    ? "flash-off"
                    : flashMode === Camera.Constants.FlashMode.on
                    ? "flash"
                    : flashMode === Camera.Constants.FlashMode.auto
                    ? "eye"
                    : ""
                }
              />
            </TouchableOpacity>
            <TakePhotoBtn onPress={takePhoto} />
            <ActionsContainer>
              <TouchableOpacity onPress={onCameraSwitch}>
                <Ionicons
                  color={colors.beige}
                  size={30}
                  name={
                    cameraType === Camera.Constants.Type.front
                      ? "camera-reverse"
                      : "camera"
                  }
                />
              </TouchableOpacity>
            </ActionsContainer>
          </ButtonsContainer>
        </Actions>
      ) : (
        <Actions>
          <PhotoAction onPress={onDismiss}>
            <PhotoActionText>Dismiss</PhotoActionText>
          </PhotoAction>
          <PhotoAction onPress={onUpload}>
            <PhotoActionText>Upload</PhotoActionText>
          </PhotoAction>
        </Actions>
      )}
    </Container>
  );
}
