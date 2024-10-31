import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Modal
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { LinearGradient } from "expo-linear-gradient";
import CustomHeader from "../components/CustomHeader";
import AntDesign from "@expo/vector-icons/AntDesign";
import { auth } from "../firebase.config";
import { firestore } from "../firebase.config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { signOut } from "firebase/auth";


const ProfileScreen = ({ navigation }) => {

  const [userData, setUserData] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [loadingLogout, setLoadingLogout] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { isDarkMode } = useTheme();

  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#9D9D9D" : "#f0f0f0",
  };
  const showToast = (type, message) => {
    Toast.show({
      type: type,
      text1: type === "success" ? "Yay!" : "Oops!",
      text2: message || "Please try again",
    });
  };

  const fetchUserData = () => {
    const user = auth.currentUser;

    if (!user) {
      console.log("User is not authenticated");
      return;
    }

    const q = query(
      collection(firestore, "users"),
      where("email", "==", user.email)
    );

    // Realtime listener for changes in Firestore
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserData(data);
          setImageUri(data.profileImage || null); // Set the profile image if available
        });
      }
    });

    return unsubscribe; // Return unsubscribe function to clean up the listener
  };

  useEffect(() => {
    const unsubscribe = fetchUserData(); // Initialize listener on mount
    return unsubscribe; // Clean up listener on unmount
  }, []);

  const handleLogout = async () => {
    Alert.alert("Confirm Logging Out", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          setLoadingLogout(true);
          try {
            await signOut(auth);
            showToast("success", "Signed out successfully");
            setTimeout(() => {
              navigation.replace("LoginScreen");
            }, 1000);
          } catch (error) {
            setLoadingLogout(false)
            showToast("error", error.message);
          }
        },
      },
    ]);
  };

  return (
    <LinearGradient
      colors={
        isDarkMode
          ? [
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
            ]
          : ["#fff", "#fff"]
      }
      start={{ x: 0.03, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={{ opacity: 0.95, flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.headerView}>
            <CustomHeader title={"Profile"} />
          </View>

          <View style={styles.imageView}>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.imageTouchable}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <FontAwesome5
                name="user"
                size={45}
                style={[styles.placeholderImage, backgroundStyle, textStyle]}
              />
            )}
            </TouchableOpacity>
          </View>

          <View style={styles.nameView}>
            <Text style={[styles.nameText, textStyle]}>
              {userData?.firstname} {userData?.lastname}
            </Text>
          </View>

          <View style={styles.settingsView}>
            <TouchableOpacity
              style={[styles.touchable, backgroundStyle]}
              onPress={() => navigation?.navigate("MyAccount")}
            >
              <FontAwesome5
                name="user-circle"
                size={26}
                color={isDarkMode ? "#fff" : "black"}
              />
              <Text style={[styles.touchableText, textStyle]}>My Account</Text>
              <AntDesign
                name="right"
                size={24}
                color={isDarkMode ? "#fff" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchable, backgroundStyle]}>
              <AntDesign
                name="exclamationcircleo"
                size={26}
                color={isDarkMode ? "#fff" : "black"}
              />
              <Text style={[styles.touchableText, textStyle]}>FAQ</Text>
              <AntDesign
                name="right"
                size={24}
                color={isDarkMode ? "#fff" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchable, backgroundStyle]}>
              <AntDesign
                name="customerservice"
                size={26}
                color={isDarkMode ? "#fff" : "black"}
              />
              <Text style={[styles.touchableText, textStyle]}>Contact Us</Text>
              <AntDesign
                name="right"
                size={24}
                color={isDarkMode ? "#fff" : "black"}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.touchable, backgroundStyle]} onPress={handleLogout}>
            <MaterialIcons name="logout" size={26} color={isDarkMode ? "#fff" : "black"} />
              <Text style={[styles.touchableText, textStyle]}>Log Out</Text>
              <AntDesign
                name="right"
                size={24}
                color={isDarkMode ? "#fff" : "black"}
              />
            </TouchableOpacity>
          </View>
        </ScrollView>
        {loadingLogout && (
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
      </SafeAreaView>
    </LinearGradient>
  );
};
export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 65,
  },
  headerView: {
    width: "90%",
    paddingTop: 20,
  },
  imageView: {
    width: "80%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  imageTouchable:{
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  nameView: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 30,
  },
  nameText: {
    fontSize: 18,
    fontWeight: "600",
  },
  emailText: {
    color: "#9D9D9D",
    fontWeight: "500",
  },
  settingsView: {
    width: "90%",
    gap: 30,
    paddingTop: 30,
  },
  touchable: {
    width: "100%",
    height: 70,
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 20,
  },
  touchableText: {
    fontSize: 17,
    fontWeight: "500",
  },
  image: {
    width: "34%",
    height: 113,
    borderRadius: 100,
  },
  placeholderImage: {
    width: "37%",
    height: 113,
    borderRadius: 100,
    textAlign: "center",
    lineHeight: 100,
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
});
