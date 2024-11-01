import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomHeader from "../components/CustomHeader";
import TextField from "../components/TextField";
import CategoriesList from "../lists/CategoriesList";
import BooksLists from "../lists/BooksLists";
import { categories, booksData } from "../src/Data";
import NewArrivalsBooksList from "../lists/NewArrivalsBooksList";
import { useTheme } from '../src/ThemeContext'; 
import { LinearGradient } from "expo-linear-gradient";
import { auth } from '../firebase.config'; 
import { firestore } from '../firebase.config'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';


const HomeScreen = ({navigation}) => {
  const [userData, setUserData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(categories[0].id);
  const { isDarkMode } = useTheme();

  const textStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const fetchUserData = () => {
    const user = auth.currentUser;

    if (!user) {
      console.log('User is not authenticated');
      return;
    }

    const q = query(collection(firestore, 'users'), where('email', '==', user.email));

    // Realtime listener for changes in Firestore
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserData(data);
        });
      }
    });

    return unsubscribe; // Return unsubscribe function to clean up the listener
  };

  useEffect(() => {
    const unsubscribe = fetchUserData(); // Initialize listener on mount
    return unsubscribe; // Clean up listener on unmount
  }, []);

  return (
    <LinearGradient
      colors={isDarkMode ? [
        "#09FBD3", "#19191B", "#19191B", "#19191B", "#19191B", "#4D0F28", "#4D0F28", "#19191B", "#19191B", "#19191B", "#09FBD3", "#09FBD3"
      ] : ['#fff', '#fff']}
      start={{ x: 0.03, y: 0.1 }}
      end={{ x: 1, y: 1 }}
      style={{ opacity: 0.95, flex: 1 }}
    >
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
                <CustomHeader menu={"menu"} />
              </View>

              <View style={styles.welcomeView}>
                <Text style={[styles.welcomeText, textStyle]}>Welcome Back, {userData?.firstname}!</Text>
                <Text style={[styles.todayText, textStyle]}>
                  What do you want to read today?
                </Text>
              </View>

              <View style={styles.searchView}>
                <TextField search={"search1"} placeholder={"Search"} />
              </View>

              <View style={styles.categoriesView}>
                <CategoriesList
                  selectedCategory={selectedCategory}
                  onSelectCategory={handleCategorySelect}
                />
              </View>

              <View style={styles.booksView}>
                <BooksLists
                  books={booksData.filter(
                    (book) =>
                      book.category ===
                      categories.find((c) => c.id === selectedCategory).title
                  )}
                  onPress={(item) => navigation?.navigate('BookDetailScreen', { item })}
                />
              </View>

              <View style={styles.arrivalView}>
                <Text style={[styles.arrivalText, textStyle]}>New Arrivals</Text>
              </View>

              <View style={styles.newarrivalView}>
                <NewArrivalsBooksList />
              </View>
              
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 80, // Updated padding for better spacing
  },
  keyboardContainer: {
    flexGrow: 1,
  },
  headerView: {
    width: "90%",
  },
  welcomeView: {
    width: "90%",
    justifyContent: "center",
    paddingBottom: 30,
    gap: 10,
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: "500",
  },
  searchView: {
    width: "90%",
  },
  todayText: {
    width: "80%",
    fontSize: 26,
    fontWeight: "500",
  },
  categoriesView: {
    width: "90%",
    paddingTop: 30,
  },
  booksView: {
    width: "90%",
    paddingTop: 30,
  },
  arrivalView: {
    width: "90%",
    paddingTop: 50,
  },
  arrivalText: {
    fontSize: 24,
    fontWeight: "500",
  },
  newarrivalView: {
    width: "90%",
    paddingTop: 30,
    paddingBottom: 30,
  },
});
