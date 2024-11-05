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
import React, { useEffect, useState } from "react";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import TextField from "../components/TextField";
import Toast from "react-native-toast-message";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase.config";
import { z } from "zod";
import { doc, setDoc, collection } from "firebase/firestore"; // Import necessary Firestore functions
import { firestore } from "../firebase.config";
import PrimaryButton from "../components/PrimaryButton";

const signupSchema = z
  .object({
    firstname: z.string().nonempty("First name is required*"),
    lastname: z.string().nonempty("Last name is required*"),
    email: z
      .string()
      .email("Invalid email address")
      .nonempty("Email is required*"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters*")
      .nonempty("Password is required*"),
    cpassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters*")
      .nonempty("Confirm password is required*"),
  })
  .refine((data) => data.password === data.cpassword, {
    message: "Passwords does not match",
    path: ["cpassword"],
  });

const SignupScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Set the status bar to white background with dark text
    StatusBar.setBarStyle('dark-content'); // for iOS
    StatusBar.setBackgroundColor('#FFFFFF'); // for Android
  }, []);

  const handleSignup = async () => {
    Keyboard.dismiss();
    setLoading(true); // Start loading
    setErrors({}); // Clear previous errors

    const validationResult = signupSchema.safeParse({
      firstname,
      lastname,
      email,
      password,
      cpassword,
    });

    if (!validationResult.success) {
      const fieldErrors = {};
      validationResult.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message; // Set error message for corresponding field
      });
      setErrors(fieldErrors); // Set errors to state
      setLoading(false); // Stop loading
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await setDoc(doc(collection(firestore, "users"), user.uid), {
        firstname,
        lastname,
        email,
        createdAt: new Date(), // You can store additional info if needed
      });
      showSuccess();
      // Reset form fields
      setEmail("");
      setPassword("");
      setCpassword("");
      setFirstname("");
      setLastname("");
      // Optionally delay navigation to show success message
      setTimeout(() => {
        navigation?.navigate("BottomNavigator");
      }, 500);
    } catch (error) {
      // showError(getErrorMessage(error));
      console.log(getErrorMessage(error));
    } finally {
      setLoading(false); // Stop loading at the end
    }
  };

  const getErrorMessage = (error) => {
    if (error.code === "auth/email-already-in-use") {
      return "This email address is already registered.";
    }
    return error.message; // General error message
  };

  const showSuccess = () => {
    Toast.show({
      type: "success",
      text1: "Welcome To The Book App, Reader!",
    });
  };

  const showError = (message) => {
    Toast.show({
      type: "error",
      text1: "Oops!",
      text2: message || "Please Try Again",
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
              start={{ x: 0.03, y: 0.1 }}
              end={{ x: 1, y: 1 }}
              style={styles.innerContainer}
            >
              <Text style={styles.header}>Sign Up</Text>
              <View style={styles.formView}>
                <View style={styles.nameView}>
                  <TextField
                    keyboardType={"default"}
                    placeholder={"First Name"}
                    value={firstname}
                    onChangeText={setFirstname}
                    error={errors.firstname}
                  />
                  <TextField
                    keyboardType={"default"}
                    placeholder={"Last Name"}
                    value={lastname}
                    onChangeText={setLastname}
                    error={errors.lastname}
                  />
                </View>
                <TextField
                  keyboardType={"email"}
                  placeholder={"Enter Your Email"}
                  value={email}
                  onChangeText={setEmail}
                  error={errors.email}
                />
                <TextField
                  keyboardType={"password"}
                  placeholder={"Enter Your Password"}
                  value={password}
                  onChangeText={setPassword}
                  error={errors.password}
                />
                <TextField
                  keyboardType={"password"}
                  placeholder={"Confirm Password"}
                  value={cpassword}
                  onChangeText={setCpassword}
                  error={errors.cpassword}
                />

                <PrimaryButton
                  title={'Sign Up'}
                  style={styles.button}
                  onPress={handleSignup}
                >
                  <Text style={styles.buttonText}>Sign Up</Text>
                </PrimaryButton>
              </View>

              <View style={styles.alreadyView}>
                <Text style={styles.alreadyText}>Already Have An Account?</Text>
                <TouchableOpacity
                  onPress={()=>navigation?.navigate('LoginScreen')}
                >
                  <Text style={styles.signinText}>Log In</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {loading && (
        <View style={styles.indicatorView}>
          <ActivityIndicator size={"large"} color={"green"} />
        </View>
      )}
    </SafeAreaView>
    </>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  keyboardContainer: {
    flex: 1,
    justifyContent: "center",
  },
  innerContainer: {
    width: "90%",
    paddingHorizontal:15,
    paddingVertical:20,
    opacity: 0.9,
    borderRadius: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 30,
    color: "#fff",
  },
  formView: {
    width: "100%",
    alignItems: "center",
    gap: 10,
    paddingBottom: 20,
  },
  nameView: {
    flexDirection: 'row',
    width: '73%',
    gap: 10,
    alignItems:'center',
    justifyContent:'center'
  },
  alreadyView: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    gap: 5,
  },
  alreadyText: {
    fontSize: 14,
    color: "#fff",
  },
  signinText: {
    fontSize: 14,
    color: "#09FBD3",
    fontWeight: "500",
  },
  indicatorView: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
