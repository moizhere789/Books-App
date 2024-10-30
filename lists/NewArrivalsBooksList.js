import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { newArrivalBooksData } from '../src/Data';
import { useTheme } from '../ThemeContext'; 


const NewArrivalsBooksList = () => {

  const { isDarkMode } = useTheme();

  const textColor = isDarkMode ? '#fff' : '#000';

  return (
    <View style={styles.container}>
      <FlatList
        data={newArrivalBooksData}
        keyExtractor={(item) => item.id.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.touchable}
              // accessibilityLabel={`Book titled ${item.title} by ${item.author}`}
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
        contentContainerStyle={{ gap: 20, paddingHorizontal: 5 }}
      />
    </View>
  );
};

export default NewArrivalsBooksList;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height:320,
  },
  card: {
    width: 150,
    height:320,
    alignItems: 'center',
    borderRadius: 12,
    gap: 8,
  },
  touchable: {
    width: '100%',
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
