import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useTheme } from '../src/ThemeContext'; 


const BooksLists = ({ books, onPress }) => {
  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <FlatList
      data={books}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <TouchableOpacity 
            style={styles.touchable}
            onPress={() => onPress(item)}
          >
            <Image 
              source={item.image} 
              style={styles.bookImage} 
              resizeMode="cover" 
              onError={() => console.log(`Failed to load image for ${item.title}`)}
            />
          </TouchableOpacity>
          <View style={styles.textView}>
            <Text style={[styles.title, { color: textColor }]} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.author}>{item.author}</Text>
          </View>
        </View>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20, paddingHorizontal: 5 }}
    />
  );
};
export default BooksLists;

const styles = StyleSheet.create({
  card: {
    width: 150,
    alignItems: 'center',
    borderRadius: 12,
    gap: 8,
  },
  touchable: {
    width: '100%',
    height: 249,
    alignItems: 'center', 
  },
  bookImage: {
    width: '100%',
    height: 249,
    borderRadius: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  author: {
    fontSize: 12,
    color: '#9D9D9D',
    fontWeight: '500',
    paddingHorizontal: 3,
  },
  textView: {
    width: '100%',
    gap: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
