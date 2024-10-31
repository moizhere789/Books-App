import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { BookmarkContext } from '../src/BookmarkContext';
import { useTheme } from '../src/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { LinearGradient } from 'expo-linear-gradient';

const BookmarkScreen = () => {
  const { bookmarkedBooks } = useContext(BookmarkContext);
  const { isDarkMode } = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#9D9D9D" : "#f0f0f0",
  };
  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
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
      style={{ opacity: 0.95, flex:1 }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <CustomHeader title="Bookmarks" />
        </View>
        <View style={styles.flatlistView}>
          <FlatList
            data={bookmarkedBooks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={[styles.bookItem, backgroundStyle]}>
                <TouchableOpacity>
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
        </View>
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
  headerView: {
    width: '90%',
    paddingVertical: 20,
  },
  flatListContent: {
    width:'100%',
    paddingTop: 10,
    gap: 20,
    paddingBottom: 75,
  },
  bookItem: {
    flexDirection: 'row',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    gap:12
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
    color:'#f0f0f0'
  },
  flatlistView: {
    flex: 1,
    width:'90%'
  },
});
