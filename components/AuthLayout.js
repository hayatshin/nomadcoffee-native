import React from "react";
import styled from "styled-components/native";
import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ImageBackground,
} from "react-native";
import { KeyboardAvoidingView } from "react-native";

const Container = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function AuthLayout({ children }) {
  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ImageBackground
        style={{
          flex: 1,
          width: "100%",
        }}
        imageStyle={{ opacity: 0.5 }}
        source={require("../assets/cafe1.jpeg")}
      >
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
          <Container>
            <KeyboardAvoidingView
              style={{
                width: "100%",
              }}
              behavior="padding"
            >
              {children}
            </KeyboardAvoidingView>
          </Container>
        </TouchableWithoutFeedback>
      </ImageBackground>
    </View>
  );
}
