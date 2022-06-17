import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import colors from "../colors";
import { gql, useMutation } from "@apollo/client";
import { logUserIn } from "../apollo";
import { useNavigation } from "@react-navigation/native";
import AuthLayout from "../components/AuthLayout";

const LOGIN_MUTATION = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      error
      token
    }
  }
`;

const AuthForm = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const AuthInput = styled.TextInput`
  width: 80%;
  height: 45px;
  background-color: ${colors.beige};
  border: 1px solid ${colors.darkBrown};
  margin-bottom: 15px;
  text-align: center;
  border-radius: 10px;
  font-size: 16px;
`;

const AuthButton = styled.TouchableOpacity`
  margin-top: 30px;
  width: 60%;
  height: 45px;
  background-color: ${colors.darkBrown};
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  color: ${colors.beige};
  font-size: 18px;
  font-weight: 600;
`;

const BrandForm = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.darkBrown};
  width: 70px;
  height: 70px;
  border-radius: 35px;
  margin-bottom: 30px;
`;

export default function Profile_Logout() {
  const navigation = useNavigation();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const usernameRef = useRef();
  const passwordRef = useRef();

  // useEffect(() => {
  //   register("username");
  //   register("password");
  // }, [register]);

  const onCompleted = async (data) => {
    const {
      login: { ok, token },
    } = data;
    if (ok) {
      await logUserIn(token);
    }
  };

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION, {
    onCompleted,
  });

  const onNext = (nextOne) => {
    nextOne?.current?.focus();
  };
  const onValid = (data) => {
    if (!loading) {
      loginMutation({
        variables: {
          ...data,
        },
      });
    }
  };

  return (
    <AuthLayout>
      <AuthForm>
        <BrandForm>
          <Feather
            style={{ color: colors.beige, fontSize: 40 }}
            name="coffee"
          />
        </BrandForm>
        <AuthInput
          {...register("username", {
            required: "please enter your email.",
          })}
          ref={usernameRef}
          placeholder="Username"
          placeholderTextColor={colors.darkBrown}
          onSubmitEditing={() => onNext(passwordRef)}
          onChangeText={(text) => setValue("username", text)}
          autoCapitalize="none"
        />
        <AuthInput
          {...register("password", {
            required: "please enter your password.",
          })}
          ref={passwordRef}
          placeholder="Password"
          secureTextEntry
          placeholderTextColor={colors.darkBrown}
          onChangeText={(text) => setValue("password", text)}
          autoCapitalize="none"
        />
        <AuthButton onPress={handleSubmit(onValid)}>
          <ButtonText>Login</ButtonText>
        </AuthButton>
      </AuthForm>
    </AuthLayout>
  );
}
