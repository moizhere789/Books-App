import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useTheme } from '../ThemeContext'; 

const TextField = ({placeholder,value,onChangeText,keyboardType,search}) => {
  const [visible, setIsVisible] =useState (false)

  const { isDarkMode } = useTheme();

  return (
    <>
    
    {keyboardType && keyboardType === 'default' && (
    <View style={styles.nameInputView}>
    <TextInput placeholder={placeholder} keyboardType={keyboardType} onChangeText={onChangeText} value={value} 
    style={styles.nameInput} placeholderTextColor={'#fff'} color={'#fff'}/>
    </View>
    )}
    
    {keyboardType && keyboardType === 'email' && (
    <View style={styles.inputView}>
    <MaterialIcons name="email" size={24} color="#fff" />
    <TextInput placeholder={placeholder} keyboardType={keyboardType} onChangeText={onChangeText} value={value}
     style={styles.input} placeholderTextColor={'#fff'} color={'#fff'} autoCapitalize='none'/>
    </View>
    )}
    
    {keyboardType && keyboardType === 'password' && (
    <View style={styles.inputView}>
    <FontAwesome name="lock" size={24} color="#fff" />
    <TextInput placeholder={placeholder} keyboardType={keyboardType} onChangeText={onChangeText} value={value}
     style={styles.input} placeholderTextColor={'#fff'} color={'#fff'} secureTextEntry={visible ? true : false} 
     autoCapitalize='none'/>
     <TouchableOpacity>
     <Entypo name="eye" size={24} color="#fff" />
     </TouchableOpacity>
    </View>
    )}

    {search && (
      <View style={[styles.searchView, {opacity: isDarkMode ? 1 : 0.7}, 
      { backgroundColor: isDarkMode ? 'lightgrey' : '#C4C4C4' }]}>
        <AntDesign name={search} size={20} color="grey" />
        <TextInput placeholder={placeholder} onChangeText={onChangeText} value={value} style={styles.searchInput}/>
        <TouchableOpacity>
        <FontAwesome name="microphone" size={20} color="grey" />
        </TouchableOpacity>
      </View>
    )}
    
    </>
  )
}

export default TextField

const styles = StyleSheet.create({
    nameInputView:{
        width:'45%',
        height:50,
        borderWidth: 0.75,
        borderColor:'grey',
        borderRadius:10,
        justifyContent:'center',
        paddingHorizontal:10
    },
    inputView:{
        width:'95%',
        height:50,
        borderWidth: 0.75,
        borderColor:'grey',
        borderRadius:10,
        alignItems:'center',
        paddingHorizontal:10,
        flexDirection:'row',
        // gap:5
    },
    input:{
        width:'83%',
        height:40,
        justifyContent:'center',
        paddingHorizontal:10
    },
    searchView:{
      flexDirection:'row',
      width:'100%',
      height:50,
      backgroundColor:'#C4C4C4',
      alignItems:'center',
      paddingHorizontal:10,
      borderRadius:10,
      gap:10,
    },
    searchInput:{
      width:'83%',
      height:40,
      alignItems:'center',
      fontSize:16,
    }
})