import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';

const Bottom = createBottomTabNavigator();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator screenOptions={{headerShown: false, tabBarHideOnKeyboard: true}}>     
      <Bottom.Screen name='HomeScreen' component={HomeScreen}/>
    </Bottom.Navigator>
  )
}

export default BottomNavigator

const styles = StyleSheet.create({})