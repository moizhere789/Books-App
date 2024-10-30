import { StyleSheet, Text, TouchableOpacity, View, Switch } from 'react-native';
import React from 'react';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import EvilIcons from '@expo/vector-icons/EvilIcons';
import { useTheme } from '../ThemeContext'; // Adjust the path accordingly

const CustomHeader = ({ menu, title }) => {

  const { isDarkMode, toggleTheme } = useTheme();

  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <>
      {menu && (
        <View style={styles.container}>
          <TouchableOpacity>
            <Feather name={menu} size={28} color={isDarkMode ? '#fff' : 'black'} />
          </TouchableOpacity>
          <View style={styles.toggleView}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "grey", true: '#fff' }}
              thumbColor={isDarkMode ? "#fff" : "#19191B"}
              ios_backgroundColor="#3e3e3e"
              style={styles.toggleSwitch}
            />
            <EvilIcons name="user" size={45} color={isDarkMode ? '#fff' : 'black'} />
          </View>
        </View>
      )}

      {title && title === 'Profile' && (
        <View style={styles.profileView}>
          <Text style={[styles.profileText, {color: textColor}]}>{title}</Text>
        </View>
      )}
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleView: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  toggleSwitch: {
    marginRight: 10,
  },
  profileView:{
    width:'100%',
  },
  profileText:{
    width:'100%',
    fontSize:25,
    fontWeight:'700',
    textAlign:'center'
  }
});
