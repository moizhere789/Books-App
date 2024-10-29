import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Logo from '../assets/images/logo.svg'

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(()=>{
      navigation?.navigate('GetStarted')
    },1000)
  }, [])
  
  return (
    <View style={styles.container}>
      <Logo/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#fff',
  }
})