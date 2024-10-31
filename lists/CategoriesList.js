import { FlatList, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { categories } from "../src/Data";
import { useTheme } from "../src/ThemeContext";

const CategoriesList = ({ selectedCategory, onSelectCategory }) => {
  const { isDarkMode } = useTheme();

  const categoryTextColor = isDarkMode ? "grey" : "grey";
  const selectedTextColor = isDarkMode ? "#fff" : "#000";

  return (
    <FlatList
      data={categories}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => onSelectCategory(item.id)}
          style={[
            styles.categoryItem,
            selectedCategory === item.id && styles.selectedCategory,
          ]}
          accessibilityLabel={`Select category: ${item.title}`}
        >
          <Text
            style={[
              styles.categoryText,
              { color: categoryTextColor },
              selectedCategory === item.id && { color: selectedTextColor },
            ]}
          >
            {item.title}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id.toString()}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ gap: 20 }}
    />
  );
};

export default CategoriesList;

const styles = StyleSheet.create({
  categoryItem: {
    height: 30,
    justifyContent: "center",
  },
  selectedCategory: {
    borderBottomWidth: 2,
    borderBottomColor: "#D45555",
    borderRadius: 5,
  },
  categoryText: {
    fontSize: 16,
  },
});
