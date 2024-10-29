import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigator from "./navigators/AppNavigator";
import { StatusBar } from "react-native";

export default function App() {
  return (
    <>
    <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'}/>
    <NavigationContainer>
      <AppNavigator/>
    </NavigationContainer>
    </>
  );
};
