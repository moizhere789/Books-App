import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React from "react";
import { useTheme } from '../ThemeContext'; 
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../components/CustomHeader";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const ProfileScreen = () => {

  const { isDarkMode } = useTheme();

  const textStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#9D9D9D' : 'lightgrey',
  };

  return (
    <LinearGradient  colors={isDarkMode ? [
    "#09FBD3",
    "#19191B",
    "#19191B",
    "#19191B",
    "#19191B",
    "purple",
    "#19191B",
    "#19191B",
    "#19191B",
    "#09FBD3",
    "#09FBD3",]: ['#fff', '#fff']} start={{ x: 0.03, y: 0.1 }} end={{ x: 1, y: 1 }} style={{opacity:0.95,flex:1}}>
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.headerView}>
              <CustomHeader title={'Profile'}/>
            </View>

            <View style={styles.imageView}>
              <Image source={require('../assets/images/user.jpg')} style={styles.image} resizeMode="cover"/>
            </View>

            <View style={styles.nameView}>
              <Text style={[styles.nameText,textStyle]}>Moiz Manzoor</Text>
            </View>

            <View style={styles.settingsView}>
            <TouchableOpacity style={[styles.touchable, backgroundStyle]}>
            <FontAwesome5 name="user-circle" size={26} color={isDarkMode ? '#fff' : 'black'} />
                <Text style={[styles.touchableText, textStyle]}>My Account</Text>
                <AntDesign name="right" size={24} color={isDarkMode ? '#fff' : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchable, backgroundStyle]}>
            <AntDesign name="exclamationcircleo" size={26} color={isDarkMode ? '#fff' : 'black'} />
                <Text style={[styles.touchableText, textStyle]}>Faq</Text>
                <AntDesign name="right" size={24} color={isDarkMode ? '#fff' : 'black'} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchable, backgroundStyle]}>
            <AntDesign name="customerservice" size={26} color={isDarkMode ? '#fff' : 'black'} />
                <Text style={[styles.touchableText, textStyle]}>Contact Us</Text>
                <AntDesign name="right" size={24} color={isDarkMode ? '#fff' : 'black'} />
            </TouchableOpacity>
            </View>

          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  );
};
export default ProfileScreen

const styles = StyleSheet.create({

  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom:65,
  },
  keyboardContainer: {
    flexGrow: 1,
  },
  headerView:{
    width:'90%',
    paddingTop:20
  },
  imageView:{
    width:'30%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:30
  },
  image:{
    width:130,
    height: 130,
    borderRadius:100
  },
  nameView:{
    width:'90%',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:30
  },
  nameText:{
    fontSize:18,
    fontWeight:'600'
  },
  emailText:{
    color:'#9D9D9D',
    fontWeight:'500'
  },
  settingsView:{
    width:'90%',
    gap:30,
    paddingTop:30
  },
  touchable:{
    width:'100%',
    height:70,
    flexDirection:'row',
    paddingHorizontal:20,
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:20
  },
  touchableText:{
    fontSize:17,
    fontWeight:'500'
  }

})