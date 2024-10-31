import {
    Keyboard,
    View,
    TouchableOpacity,
    Image,
    Alert,
    ActivityIndicator,
    RefreshControl,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Modal,
    Text,
    TouchableWithoutFeedback,
  } from "react-native";
  import React, { useEffect, useState } from "react";
  import CustomHeader from "../components/CustomHeader";
  import { useTheme } from '../src/ThemeContext'; 
import { LinearGradient } from "expo-linear-gradient";
import { auth, storage } from "../firebase.config";
import * as ImagePicker from "expo-image-picker";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { firestore } from '../firebase.config'; 
import {
    collection,
    query,
    where,
    getDocs,
    setDoc,
    doc,
  } from "firebase/firestore";
import Toast from "react-native-toast-message";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import TextField from "../components/TextField";
import PrimaryButton from "../components/PrimaryButton";



const MyAccount = ({navigation}) => {

    const [imageUri, setImageUri] = useState(null);
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const { isDarkMode } = useTheme();

    const textStyle = {
        color: isDarkMode ? "#fff" : "#000",
      };
      const backgroundStyle = {
        backgroundColor: isDarkMode ? "#9D9D9D" : "#f0f0f0",
      };

      const user = auth.currentUser;

      // Function to fetch user data from Firestore
      const fetchUserData = async () => {
        try {
          if (!user) {
            throw new Error("User is not authenticated");
          }
    
          const q = query(
            collection(firestore, "users"),
            where("email", "==", user.email)
          );
          const querySnapshot = await getDocs(q);
    
          if (querySnapshot.empty) {
            console.error("No user data found.");
            return;
          }
    
          // Set user data from Firestore
          querySnapshot.forEach((doc) => {
            setUserData(doc.data());
            // Set the image URI from Firestore if available
            setImageUri(doc.data().profileImage || null);
          });
        } catch (error) {
          showError(error.message);
        }
      };
    
      // Call fetchUserData when the component mounts
      useEffect(() => {
        fetchUserData();
      }, []);
    
      // Function to pick an image from the gallery
      const pickImage = async () => {
        const permissionResult =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
    
        if (permissionResult.granted === false) {
          showError(
            "Permission Required: You need to allow access to the media library."
          );
          return;
        }
    
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [7, 8],
          quality: 1,
        });
    
        if (!result.canceled) {
          uploadImage(result.assets[0].uri); // Upload the selected image
        }
      };
    
      // Function to upload image to Firebase Storage
      const uploadImage = async (uri) => {
        setLoading(true);
        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, `user_images/${user.uid}.jpg`);
    
        try {
          await uploadBytes(storageRef, blob);
          const downloadUrl = await getDownloadURL(storageRef);
          setImageUri(downloadUrl); // Set the image URI to display
    
          // Update the user's profile image URL in Firestore
          await setDoc(
            doc(firestore, "users", user.uid),
            { profileImage: downloadUrl },
            { merge: true }
          );
          showSuccess("Image Uploaded Successfully");
        } catch (error) {
          showError(error.message);
        } finally {
          setLoading(false);
        }
      };
    
      // Confirm deletion before executing
      const deleteImage = async () => {
        Alert.alert(
          "Confirm Deletion",
          "Are you sure you want to delete the profile image?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: async () => {
                setLoading(true);
                const storageRef = ref(storage, `user_images/${user.uid}.jpg`);
                try {
                  await deleteObject(storageRef);
                  setImageUri(null); // Clear the image URI
                  showSuccess("Image deleted successfully!");
    
                  // Remove the profile image URL from Firestore
                  await setDoc(
                    doc(firestore, "users", user.uid),
                    { profileImage: null },
                    { merge: true }
                  );
                } catch (error) {
                  showError(error.message);
                } finally {
                  setLoading(false);
                }
              },
            },
          ]
        );
      };
    
      // Function to handle camera icon click
      const handleCameraClick = () => {
        const options = imageUri
          ? ["Upload New Image", "Delete Image", "Cancel"]
          : ["Upload Image", "Cancel"];
    
        Alert.alert(
          "What would you like to do?",
          "",
          [
            {
              text: options[0],
              onPress: () => {
                pickImage(); // Always attempt to pick an image, regardless of the current state
              },
            },
            ...(imageUri
              ? [
                  {
                    text: options[1],
                    onPress: () => deleteImage(), // Delete image option
                  },
                ]
              : []),
            {
              text: options[options.length - 1], // Cancel button
              style: "cancel",
            },
          ],
          { cancelable: true } // Make alert cancelable
        );
      };
    
      const updateUserInfo = async () => {
        Alert.alert(
          "Updating Profile Info",
          "Are You Sure You Want To Update Profile Info",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Yes",
              onPress: async () => {
                setLoading(true);
                if (!firstName || !lastName) {
                  showError("Please fill in both first and last name.");
                  setLoading(false);
                  return;
                }
                try {
                  await setDoc(
                    doc(firestore, "users", user.uid),
                    {
                      firstname: firstName,
                      lastname: lastName,
                    },
                    { merge: true }
                  );
    
                  // Clear input fields after update
                  setFirstName("");
                  setLastName("");
    
                  showSuccess("User info updated successfully!");
                } catch (error) {
                  showError(error.message);
                } finally {
                  setLoading(false);
                }
              },
            },
          ]
        );
      };
    
      const showSuccess = (message) => {
        Toast.show({
          type: "success",
          text1: "Yay!",
          text2: message,
        });
      };
    
      const showError = (message) => {
        Toast.show({
          type: "error",
          text1: "Oops!",
          text2: message || "Please try again",
        });
      };
      const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        fetchUserData().finally(() => setRefreshing(false));
      }, []);

  return (
    <LinearGradient  colors={isDarkMode ? [
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
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                  }
              >
                <View style={styles.headerView}>
                  <CustomHeader goBack={()=>navigation?.goBack()} title={'My Account'}/>
                </View>

                <View style={styles.userDetailView}>
          <View style={styles.imageContainer}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              {imageUri ? (
                <Image source={{ uri: imageUri }} style={[styles.image,backgroundStyle,textStyle]} />
              ) : (
                <View style={[styles.image, styles.placeholderContainer,backgroundStyle,textStyle]}>
                  <FontAwesome5 name="user" size={35} color="#aaa" />
                </View>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={handleCameraClick}
            >
              <FontAwesome name="camera" size={21} color={isDarkMode ? "#fff" : 'black'} />
            </TouchableOpacity>
            </View>
            <View>
            <Text style={[styles.userName,textStyle]}>
              {userData?.firstname} {userData?.lastname}
            </Text>
            <Text style={styles.userEmail}>{userData?.email}</Text>
          </View>
            </View>

          <View
          style={{
            width: "150%",
            alignItems: "center",
            gap: 20,
            paddingTop: 40,
          }}
        >
          <Text style={[styles.updateText,textStyle]}>Update Info</Text>
          <TextField
            placeHolder={userData?.firstname}
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextField
            placeHolder={userData?.lastname}
            value={lastName}
            onChangeText={setLastName}
          />
          <View style={{width:'90%',justifyContent:'center',alignItems:'center'}}>
          <PrimaryButton updateInfo={updateUserInfo} title={'Update Info'} disabled={loading}/>
          </View>
        </View>
        {/* <PrimaryButton title={"Update Info"} onPress={updateUserInfo}  /> */}
      {loading && (
        <View style={styles.indicatorView}>
          <ActivityIndicator size="large" color="green" />
        </View>
      )}
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)} // Handles Android back button
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <FontAwesome5 name="times" size={30} color="#fff" />
          </TouchableOpacity>

          {/* Conditional rendering for imageUri */}
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.modalImage} />
          ) : (
            <Text style={styles.errorMessage}>No image available</Text>
          )}
        </View>
      </Modal>
                </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
    </LinearGradient>
  )
}

export default MyAccount

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
      },
      scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
      },
      keyboardContainer: {
        flexGrow: 1,
      },
      headerView: {
        width: "90%",
      },
      userDetailView: {
        width: "90%",
        paddingHorizontal: 20,
        paddingVertical:20,
        alignItems: "center",
        gap:30
      },
      imageContainer: {
        position: "relative",
        alignItems: "center",
        justifyContent: "center",
      },
      userName: {
        fontSize: 20,
        fontWeight: "600",
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center'
      },
      image: {
        width: 120,
        height: 120,
        borderRadius: 70,
      },
      placeholderContainer: {
        borderRadius: 100,
        justifyContent:'center',
        alignItems:'center'
      },
      cameraIcon: {
        position: "absolute",
        bottom: 10,
        right: 2,
      },
      userEmail: {
        color: "#5B5C5C",
        fontSize: 13,
        lineHeight: 19.5,
        textAlign: "center",
      },
      updateText: {
        fontSize: 18,
        fontWeight: "600",
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
      modalContainer: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.8)",
        justifyContent: "center",
        alignItems: "center",
      },
      modalImage: {
        width: "90%",
        height: "70%",
        resizeMode: "contain",
      },
      closeButton: {
        position: "absolute",
        top: 40,
        right: 20,
      },
      errorMessage: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
    },
})