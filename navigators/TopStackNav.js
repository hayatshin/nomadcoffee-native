import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";
import TabsNav from "./TabsNav";
import UploadNav from "./UploadNav";
import UploadForm from "../screens/UploadForm";
import colors from "../colors";

const Stack = createStackNavigator();

export default function TopStackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
      }}
    >
      <Stack.Screen
        name="Tabs"
        options={{ headerShown: false }}
        component={TabsNav}
      />
      <Stack.Screen
        name="Upload"
        options={{ headerShown: false }}
        component={UploadNav}
      />
      <Stack.Screen
        name="UploadForm"
        options={{
          title: "Upload Coffee Shop Photo",
          headerTintColor: colors.brown,
          headerStyle: {
            backgroundColor: colors.beige,
          },
          headerBackImage: () => (
            <Ionicons color={colors.brown} name="close" size={28} />
          ),
        }}
        component={UploadForm}
      />
    </Stack.Navigator>
  );
}
