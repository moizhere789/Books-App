import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from 'expo-linear-gradient';
import TextField from "../components/TextField";
import Toast from 'react-native-toast-message';
import { z } from "zod";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase.config'; 
import PrimaryButton from "../components/PrimaryButton";

const loginSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required*'),
  password: z.string().min(8, 'Password must be at least 8 characters').nonempty('Password is required*'),
});

const LoginScreen = ({navigation}) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEmailChange = (value) => {
    setEmail(value);
    if (errors.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: '' }));
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    if (errors.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: '' }));
    }
  };

  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setErrors({});

    const validationResult = loginSchema.safeParse({ email, password });

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      setLoading(false);
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      showSuccess();
      setEmail('');
      setPassword('');
      setTimeout(() => {
        navigation?.navigate('BottomNavigator');
      }, 500);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.code === 'auth/wrong-password') {
      showError('Incorrect password');
    } else if (error.code === 'auth/user-not-found') {
      showError('User not found');
    } else {
      showError(error.message);
    }
  };

  const showSuccess = () => {
    Toast.show({
      type: 'success',
      text1: 'Welcome Back, Reader!',
    });
  };

  const showError = (message) => {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: message || 'Please try again.',
    });
  };
  
  return (
    <>
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
              "#19191B",
              "#19191B",
              "#19191B",
              "#19191B",
              "#4D0F28",
              "#4D0F28",
              "#19191B",
              "#19191B",
              "#19191B",
              "#09FBD3",
              "#09FBD3"
            ]}
            start={{ x: 0.03, y: 0.1 }} end={{ x: 1, y: 1 }} style={styles.innerContainer}>
            <Text style={styles.header}>Log In</Text>
            <View style={styles.formView}>
              <TextField 
              keyboardType={'email'} 
              placeholder={'Enter Your Email'}
              value={email}
              onChangeText={handleEmailChange} // Use handleEmailChange to clear error
              error={errors.email}
              />

              <TextField 
              keyboardType={'password'} 
              placeholder={'Enter Your Password'}
              value={password}
              onChangeText={handlePasswordChange} // Use handlePasswordChange to clear error
              error={errors.password}              
              />

            <PrimaryButton title={'Log In'} style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Log In</Text>
            </PrimaryButton>
            </View>

            <View style={styles.alreadyView}>
              <Text style={styles.alreadyText}>Already Have An Account?</Text>
              <TouchableOpacity onPress={()=>navigation?.navigate('SignupScreen')}>
              <Text style={styles.signinText}>Sign Up</Text>
              </TouchableOpacity>
            </View>


          </LinearGradient>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    {loading && (
            <View style={styles.indicatorView}>
                <ActivityIndicator size={'large'} color={'green'} />
            </View>
        )}
  </SafeAreaView>
  </>
  )
}

export default LoginScreen

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
    borderRadius:20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingBottom: 30,
    color:'#fff'
  },
  formView:{
    width:'100%',
    alignItems:'center',
    gap:10,
    paddingBottom:20,
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
  },
  indicatorView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
},
});