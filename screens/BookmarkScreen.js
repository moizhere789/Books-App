import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { BookmarkContext } from '../src/BookmarkContext';
import { useTheme } from '../src/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { LinearGradient } from 'expo-linear-gradient';

const BookmarkScreen = () => {
  const { bookmarks } = useContext(BookmarkContext); // Access bookmarks from context
  const { isDarkMode } = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#9D9D9D" : "#f0f0f0",
  };
  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
  };

  // Function to handle bookmark press
  const handleBookmarkPress = (item) => {
    console.log('Bookmark pressed:', item.title);
    // Perform actions with the item (e.g., navigate to details or show a modal)
  };

  // Debugging: Log bookmarks to check for IDs
  console.log('Bookmarks:', bookmarks);

  return (
    <LinearGradient
      colors={isDarkMode ? ["#09FBD3", "#19191B"] : ["#fff", "#fff"]}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <CustomHeader title="Bookmarks" />
        <FlatList
          data={bookmarks}
          keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()} // Fallback to random string
          renderItem={({ item }) => (
            <View style={[styles.bookItem, backgroundStyle]}>
              <TouchableOpacity
                onPress={(event) => {
                  event.persist(); // Keep a reference to the event
                  handleBookmarkPress(item); // Call the handler with the item
                }}
              >
                <Image source={item.image} style={styles.bookImage} resizeMode="cover" />
              </TouchableOpacity>
              <View style={styles.textContainer}>
                <Text style={[styles.title, textStyle]} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={[styles.author, textStyle]} numberOfLines={1}>
                  Author: {item.author}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={styles.flatListContent}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default BookmarkScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
  flatListContent: {
    width: '100%',
    paddingTop: 10,
    gap: 20,
    paddingBottom: 75,
  },
  bookItem: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    gap: 12,
  },
  bookImage: {
    width: 65,
    height: 100,
    borderRadius: 10,
  },
  textContainer: {
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#f0f0f0',
  },
});
