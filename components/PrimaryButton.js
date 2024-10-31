import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const PrimaryButton = ({onPress,title,updateInfo}) => {
  return (
    <>
    {onPress && (
    <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={styles.btnText}>{title}</Text>
    </TouchableOpacity>
    )}

    {updateInfo && (
          <TouchableOpacity onPress={updateInfo} style={styles.updateBtn}>
          <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    )}
    </>
  )
}

export default PrimaryButton

const styles = StyleSheet.create({
    btn:{
        width:'95%',
        height:50,
        backgroundColor: '#09FBD3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    updateBtn:{
        width:'45%',
        height:50,
        backgroundColor: '#09FBD3',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent:'center'
    },
    btnText:{
        color: 'white',
        fontWeight: 'bold',
        fontSize:20
    }
})