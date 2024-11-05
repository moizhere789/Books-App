import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useContext, useState } from "react";
import { useTheme } from "../src/ThemeContext";
import CustomHeader from "../components/CustomHeader";
import { LinearGradient } from "expo-linear-gradient";
import PrimaryButton from "../components/PrimaryButton";
import { BookmarkContext } from "../src/BookmarkContext";
import Toast from 'react-native-toast-message';

const BookDetailScreen = ({ route, navigation }) => {
  const { item } = route.params;
  const { isDarkMode } = useTheme();
  const { bookmarks, addBookmark, removeBookmark } = useContext(BookmarkContext);
  const [isBookmarked, setIsBookmarked] = useState(bookmarks.some(book => book.id === item.id));

  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
  };

  const handleBookmarkToggle = () => {
    if (isBookmarked) {
      removeBookmark(item.id);
      Toast.show({
        text1: 'Book Removed',
        text2: `${item.title} has been removed from bookmarks.`,
        type: 'info',
      });
    } else {
      addBookmark(item);
      Toast.show({
        text1: 'Book Bookmarked',
        text2: `${item.title} has been added to bookmarks.`,
        type: 'success',
      });
    }
    setIsBookmarked(!isBookmarked);
  };

  return (
    <LinearGradient
      colors={isDarkMode ? [
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
    ] : ["#fff", "#fff"]}
    start={{ x: 0.03, y: 0.1 }}
    end={{ x: 1, y: 1 }}
      style={{ opacity: 0.95, flex: 1, paddingBottom: 110 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <CustomHeader
            onPress={handleBookmarkToggle}
            bookmark={isBookmarked ? "bookmark" : "bookmark-o"}
            onGoBack={() => navigation?.goBack()}
          />
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.containerView}>
            <View style={styles.imageView}>
              <Image source={item.image} style={styles.image} />
            </View>
            <View style={styles.titleView}>
              <Text style={[styles.title, textStyle]}>{item.title}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
          <View style={styles.aboutView}>
            <Text style={[styles.aboutTitle, textStyle]}>About The Author</Text>
            <Text style={styles.aboutText}>
              {item.aboutAuthor ? item.aboutAuthor : "No Author Information Available."}
            </Text>
          </View>
          <View style={styles.overviewView}>
            <Text style={[styles.overviewTitle, textStyle]}>Overview</Text>
            <Text style={styles.overviewText}>{item.bookOverview ? item.bookOverview : 'No Overview Available'}</Text>
          </View>
        </ScrollView>
        <View style={styles.btnView}>
          <PrimaryButton download={() => {}} title={"Download Book In .pdf"} />
        </View>
      </SafeAreaView>
      <Toast />
    </LinearGradient>
  );
};

export default BookDetailScreen;

// (The styles remain unchanged)


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  headerView: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    gap: 30,
    paddingBottom: 30,
  },
  containerView: {
    width: "90%",
    gap: 20,
    paddingBottom: 20,
  },
  imageView: {
    width: "100%",
    alignItems: "center",
    paddingTop: 10,
  },
  titleView: {
    width: "100%",
    alignItems: "center",
    gap: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
  author: {
    fontSize: 16,
    color: "#9D9D9D",
  },
  image: {
    width: "50%",
    height: 300,
    borderRadius: 20,
  },
  aboutView: {
    width: "90%",
    gap: 10,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  aboutText: {
    width: "95%",
    fontSize: 15,
    color: "#9D9D9D",
  },
  overviewView: {
    width: "90%",
    gap: 10,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  overviewText: {
    width: "94%",
    fontSize: 15,
    color: "#9D9D9D",
  },
  btnView: {
    width: "90",
    justifyContent: "center",
    alignItems: "center",
  },
});
