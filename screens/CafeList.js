import React, { useEffect, useState } from "react";
import styled from "styled-components/native";
import { Text, View, ActivityIndicator } from "react-native";
import Header from "../components/Header";
import { FlatList } from "react-native-gesture-handler";

export default function CafeList({ route }) {
  const [loading, setLoading] = useState(false);
  const dataArray = route?.params?.cafeArray;
  useEffect(() => {
    if (dataArray) {
      setLoading(true);
    }
  }, [dataArray]);

  return loading ? (
    <View style={{ flex: 1 }}>
      <Header />
      <Text>{dataArray[0].name}</Text>
      <Text>{dataArray[0].latitude}</Text>
      <Text>{dataArray[0].longitude}</Text>
    </View>
  ) : (
    <View style={{ flex: 1 }}>
      <ActivityIndicator />
    </View>
  );
}
