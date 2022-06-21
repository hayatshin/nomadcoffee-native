import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import CafeList from "../screens/CafeList";
import Home from "../screens/Home";
import AllCafeList from "../screens/AllCafeList";

const Stack = createStackNavigator();

export default function HomeNav() {
  return (
    <Stack.Navigator
      initialRouteName="CafeSearch"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="CafeSearch" component={Home} />
      <Stack.Screen name="CafeList" component={CafeList} />
      <Stack.Screen name="AllCafeList" component={AllCafeList} />
    </Stack.Navigator>
  );
}
