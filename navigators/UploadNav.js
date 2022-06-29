import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SelectPhoto from "../screens/SelectPhoto";
import TakePhoto from "../screens/TakePhoto";
import colors from "../colors";
import { createStackNavigator } from "@react-navigation/stack";

const Tab = createMaterialTopTabNavigator();
const Stack = createStackNavigator();

export default function UploadNav() {
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      screenOptions={{
        tabBarStyle: {
          backgroundColor: colors.beige,
        },
        tabBarActiveTintColor: colors.brown,
        tabBarIndicatorStyle: {
          backgroundColor: colors.brown,
          top: 0,
        },
      }}
    >
      <Tab.Screen name="Select">
        {() => (
          <Stack.Navigator
            screenOptions={{
              headerTintColor: colors.brown,
              headerBackTitleVisible: false,
              headerBackImage: ({ headerTintColor }) => (
                <Ionicons color={headerTintColor} name="close" size={28} />
              ),
              headerStyle: {
                backgroundColor: colors.beige,
                shadowOpacity: 0.3,
              },
            }}
          >
            <Stack.Screen
              name="SelectPhoto"
              options={{ title: "Choose a Coffee Shop Photo" }}
              component={SelectPhoto}
            />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Take" component={TakePhoto} />
    </Tab.Navigator>
  );
}
