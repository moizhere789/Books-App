import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';

const TextField = ({placeholder,value,onChangeText,keyboardType}) => {
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
     style={styles.input} placeholderTextColor={'#fff'} color={'#fff'}/>
    </View>
    )}
    
    {keyboardType && keyboardType === 'password' && (
    <View style={styles.inputView}>
    <FontAwesome name="lock" size={24} color="#fff" />
    <TextInput placeholder={placeholder} keyboardType={keyboardType} onChangeText={onChangeText} value={value}
     style={styles.input} placeholderTextColor={'#fff'} color={'#fff'} secureTextEntry={true}/>
     <Entypo name="eye" size={24} color="#fff" />
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
    }
})