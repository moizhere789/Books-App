import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { myBooks } from '../src/Data'
import { useTheme } from '../src/ThemeContext';

const MyBooksList = ({onPress}) => {
  const { isDarkMode } = useTheme();
 
  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#9D9D9D" : "#f0f0f0",
  };
  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
  };
  return (
    <FlatList
    data={myBooks}
    keyExtractor={(item) => item.id.toString()}
    showsVerticalScrollIndicator={false}
    contentContainerStyle={styles.flatListConatiner}
    renderItem={({ item }) => (
      <View style={[styles.container, backgroundStyle]}>
        <TouchableOpacity onPress={() => onPress(item)}>
          <Image source={item.image} style={styles.bookImage} resizeMode='cover' />
        </TouchableOpacity>
        <View style={styles.detailView}>
          <Text style={[styles.titleText, textStyle]}>{item.title}</Text>
          <Text style={[styles.authorText, textStyle]}>Author: {item.author}</Text>
          <Text style={[styles.categoryText, textStyle]}>Category: {item.category}</Text>
        </View>
      </View>
    )}
  />
);
};

export default MyBooksList

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flexDirection: 'row',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        gap: 12,
        borderRadius:10
    },
    bookImage:{
        width:65,
        height:100,
        borderRadius:10
    },
    detailView:{
        width:'100%',
        height:100,
        gap:10,
        paddingVertical:10
    },
    flatListConatiner:{
        paddingTop:10
    },
    titleText:{
        fontSize: 18,
        fontWeight: 'bold',
    },
    authorText:{
        fontSize: 14,
        color: '#f0f0f0',
    },
    categoryText:{
        fontSize: 13,
        color: '#f0f0f0',
    }
})