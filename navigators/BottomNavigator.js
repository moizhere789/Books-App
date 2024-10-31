import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import Foundation from "@expo/vector-icons/Foundation";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import ProfileScreen from "../screens/ProfileScreen";
import { useTheme } from "../src/ThemeContext";
import BookmarkScreen from "../screens/BookmarkScreen";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  const { isDarkMode } = useTheme();

  return (
    <Bottom.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          position: "absolute",
          borderColor: isDarkMode ? "#19191B" : "white",
          height: 65,
          borderTopLeftRadius: 80,
          borderTopRightRadius: 80,
          backgroundColor: isDarkMode ? "#19191B" : "white",
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#D45555",
        tabBarInactiveTintColor: "grey",
      }}
    >
      <Bottom.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="BookmarkScreen"
        component={BookmarkScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome name="bookmark" size={24} color={color} />
          ),
        }}
      />
      <Bottom.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="user-alt" size={24} color={color} />
          ),
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;

const styles = StyleSheet.create({});
