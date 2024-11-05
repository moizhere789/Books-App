import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useContext } from 'react';
import { BookmarkContext } from '../src/BookmarkContext';
import { useTheme } from '../src/ThemeContext';
import CustomHeader from '../components/CustomHeader';
import { LinearGradient } from 'expo-linear-gradient';

const BookmarkScreen = ({navigation}) => {
  const { bookmarks } = useContext(BookmarkContext); // Access bookmarks from context
  const { isDarkMode } = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#9D9D9D" : "#f0f0f0",
  };
  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
  };

  const handleBookmarkPress = (item) => {
    navigation.navigate('BookDetailScreen', { item });
  }

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
      style={{ flex: 1, }}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
        <CustomHeader title="Bookmarks" />
        </View>
        {bookmarks && bookmarks.length > 0 ? (
          <View style={styles.flatlistView}>
          <FlatList
            data={bookmarks}
            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            renderItem={({ item }) => (
              <View style={[styles.bookItem, backgroundStyle]}>
                <TouchableOpacity
                  onPress={() => handleBookmarkPress(item)}
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
          </View>
        ) : (
          <View style={styles.nobookmarkView}>
          <Text style={[styles.emptyMessage, textStyle]}>
            No bookmarks added yet.
          </Text>
          </View>
        )}
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
    width: "90%",
    paddingTop: 20,
  },
  flatlistView:{
    flex:1,
    width:'90%',
    paddingTop:30,
  },
  flatListContent: {
    width: '100%',
    gap: 20,
    paddingBottom: 75,

  },
  bookItem: {
    width:'100%',
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
  nobookmarkView:{
    flex:1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
  },
  emptyMessage:{
    fontSize:20,
    fontWeight:'600'
  }
});


