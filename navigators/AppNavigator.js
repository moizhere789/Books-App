import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import SplashScreen from '../screens/SplashScreen';
import GetStarted from '../screens/GetStarted';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import BottomNavigator from './BottomNavigator';
import MyAccount from '../screens/MyAccount';
import BookDetailScreen from '../screens/BookDetailScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name='SplashScreen' component={SplashScreen}/>
      <Stack.Screen name='GetStarted' component={GetStarted}/>
      <Stack.Screen name='LoginScreen' component={LoginScreen}/>
      <Stack.Screen name='SignupScreen' component={SignupScreen}/> */}
      <Stack.Screen name='BottomNavigator' component={BottomNavigator}/>
      <Stack.Screen name='MyAccount' component={MyAccount}/>
      <Stack.Screen name='BookDetailScreen' component={BookDetailScreen}/>
    </Stack.Navigator>
  )
}

export default AppNavigator

const styles = StyleSheet.create({})