import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Search from "../screens/Search";
import Profile_Login from "../screens/Profile_Login";
import Profile_Logout from "../screens/Profile_Logout";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import HomeNav from "./HomeNav";

const Tab = createBottomTabNavigator();

export default function LoggedOutNav() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "cafe" : "cafe-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#8C441B",
        tabBarInactiveTintColor: "#313640",
      })}
    >
      <Tab.Screen name="Home" component={HomeNav} screenName="Home" />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen
        name="Profile"
        component={isLoggedIn ? Profile_Login : Profile_Logout}
      />
    </Tab.Navigator>
  );
}
