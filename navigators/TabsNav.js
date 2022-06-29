import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Profile_Login from "../screens/Profile_Login";
import Profile_Logout from "../screens/Profile_Logout";
import { useReactiveVar } from "@apollo/client";
import { isLoggedInVar } from "../apollo";
import AllCafeList from "../screens/AllCafeList";
import HomeNav from "./HomeNav";
import Camera from "../screens/Camera";

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
          } else if (route.name === "Camera") {
            iconName = focused ? "cloud-upload" : "cloud-upload-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#8C441B",
        tabBarInactiveTintColor: "#313640",
      })}
    >
      <Tab.Screen name="Home" component={AllCafeList} screenName="Home" />
      <Tab.Screen name="Search" component={HomeNav} />
      <Tab.Screen
        name="Camera"
        component={Camera}
        å
        listeners={({ navigation }) => {
          return {
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate("Upload");
            },
          };
        }}
      />
      <Tab.Screen
        name="Profile"
        component={isLoggedIn ? Profile_Login : Profile_Logout}
      />
    </Tab.Navigator>
  );
}
