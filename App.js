import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import AppNavigator from "./navigators/AppNavigator";
import { StatusBar, StyleSheet, View, Platform, SafeAreaView } from "react-native";
import { ThemeProvider, useTheme } from "./src/ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import Toast from 'react-native-toast-message';
import { BookmarkProvider} from "./src/BookmarkContext";

function MainApp() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={isDarkMode ? "light-content" : "dark-content"}
      />
      {isDarkMode ? (
        <LinearGradient
          colors={["#09FBD3", "#19191B"]}
          style={styles.statusBarGradient}
          start={{ x: 0.6, y: 0.1 }} end={{ x: 1, y: 1 }}
        />
      ): null
      }
      <SafeAreaView style={styles.safeArea}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <BookmarkProvider>
      <MainApp />
      <Toast />
      </BookmarkProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  statusBarGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "android" ? StatusBar.currentHeight : 44,
    zIndex: 1,
    opacity:0.95
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
