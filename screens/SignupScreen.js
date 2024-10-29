import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import TextField from "../components/TextField";


const SignupScreen = ({navigation}) => {

 
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardContainer}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={styles.scrollContainer}
            keyboardShouldPersistTaps="handled"
          >
            <LinearGradient
              colors={[
                "#09FBD3",
                "black",
                "black",
                "purple",
                "black",
                "black",
                "#09FBD3",
              ]}
              start={{ x: 0.03, y: 0.1 }} end={{ x: 1, y: 1 }} style={styles.innerContainer}>
              <Text style={styles.header}>Sign Up</Text>
              <View style={styles.formView}>
                <View style={styles.nameView}>
                <TextField keyboardType={'default'} placeholder={'First Name'}/>
                <TextField keyboardType={'default'} placeholder={'Last Name'}/>
                </View>
                <TextField keyboardType={'email'} placeholder={'Enter Your Email'}/>
                <TextField keyboardType={'password'} placeholder={'Enter Your Password'}/>
                <TextField keyboardType={'password'} placeholder={'Enter Your Password'}/>

              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
              </View>

              <View style={styles.alreadyView}>
                <Text style={styles.alreadyText}>Already Have An Account?</Text>
                <TouchableOpacity>
                <Text style={styles.signinText}>Sign In</Text>
                </TouchableOpacity>
              </View>

            </LinearGradient>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#fff'
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems:'center'
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  innerContainer: {
    width: '90%',
    padding: 20,
    opacity:0.9,
    borderRadius:20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 30,
    color:'#fff'
  },
  button: {
    width:'95%',
    height:50,
    backgroundColor: '#09FBD3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize:20
  },
  formView:{
    width:'100%',
    alignItems:'center',
    gap:20,
    paddingBottom:20
  },
  nameView:{
    width:'100%',
    justifyContent:'center',
    gap:10,
    flexDirection:'row'
  },
  alreadyView:{
    width:'100%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingTop:10,
    gap:5
  },
  alreadyText:{
    fontSize:14,
    color:'#fff'
  },
  signinText:{
    fontSize:14,
    color:'#09FBD3',
    fontWeight:'500'
  }
});
