import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '../src/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';

const AddBookModal = ({ closeModal }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [authorDetails, setAuthorDetails] = useState('');
  const [bookDetails, setBookDetails] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState(null); // State to store selected image URI
  const { isDarkMode } = useTheme();

  const resetFields = () => {
    setTitle('');
    setAuthor('');
    setAuthorDetails('');
    setBookDetails('');
    setCategory('');
    setImage(null); // Reset image
  };

  const handleAddBook = () => {
    if (!title || !author || !authorDetails || !bookDetails || !category || !image) {
      Toast.show({
        type: 'error',
        text1: 'All fields are required!',
        text2: 'Please fill out all fields before adding a book.',
        position: 'Top',
      });
      return;
    }}

  const handleCloseModal = () => {
    resetFields();
    closeModal();
  };

  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri); // Store selected image URI
    }
  };

  const textStyle = {
    color: isDarkMode ? "#fff" : "#000",
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#09FBD3" : "#4D0F28",
  };

  return (
    <View style={styles.modalContainer}>
      <Toast/>
      <LinearGradient
        colors={
          isDarkMode
            ? ["#09FBD3", "#19191B", "#4D0F28", "#19191B", "#09FBD3"]
            : ["#fff", "#fff"]
        }
        start={{ x: 0.03, y: 0.1 }}
        end={{ x: 1, y: 1 }}
        style={{ opacity: 0.95, height: 720, width: '85%', borderRadius: 20,paddingBottom:20, }}
        >
        <SafeAreaView style={{flexGrow:1,}}>
        <ScrollView style={{flexGrow:1,}} showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'center', width: '100%', gap: 20, }}>
          <View style={{ width: '100%', paddingHorizontal: 10, paddingVertical: 5, alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={handleCloseModal}>
              <FontAwesome name="close" size={30} color={isDarkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
          </View>

          <Text style={[styles.modalTitle, textStyle]}>Add New Book</Text>

          {/* Image Picker Button */}
          <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
            <Text style={[{ color: isDarkMode ? "#fff" : "#000" }, styles.imagePickerText]}>
              {image ? "Change Image" : "Add Image"}
            </Text>
          </TouchableOpacity>

          {/* Display Selected Image */}
          {image && <Image source={{ uri: image }} style={styles.imagePreview} />}

          <TextInput
            style={[styles.input, textStyle]}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
          />
          <TextInput
            style={[styles.input, textStyle]}
            placeholder="Author"
            value={author}
            onChangeText={setAuthor}
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
          />
          <TextInput
            style={[styles.input, styles.authorTextArea, textStyle]}
            placeholder="Author Details (max 100 chars)"
            value={authorDetails}
            onChangeText={setAuthorDetails}
            maxLength={100}
            multiline
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
          />
          <TextInput
            style={[styles.input, styles.detailTextArea, textStyle]}
            placeholder="Book Details (max 300 chars)"
            value={bookDetails}
            onChangeText={setBookDetails}
            maxLength={300}
            multiline
            placeholderTextColor={isDarkMode ? '#fff' : '#000'}
          />

          <View style={styles.pickerContainer}>
            <Picker
              selectedValue={category}
              onValueChange={(itemValue) => setCategory(itemValue)}
              style={[textStyle]}
              dropdownIconColor={isDarkMode ? "#fff" : "#000"}
            >
              <Picker.Item label="Select a Category" value="" color={isDarkMode ? "#aaa" : "#555"} />
              <Picker.Item label="Fiction" value="fiction" />
              <Picker.Item label="Non-fiction" value="nonFiction" />
              <Picker.Item label="Science" value="science" />
              <Picker.Item label="Biography" value="biography" />
              <Picker.Item label="Fantasy" value="fantasy" />
            </Picker>
          </View>

          <TouchableOpacity onPress={handleAddBook} style={[styles.addButton, backgroundStyle]}>
            <Text style={{ color: '#fff', fontSize: 18, fontWeight: '500' }}>Add Book</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
};

export default AddBookModal;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  input: {
    width: '90%',
    borderWidth: 0.75,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderRadius: 10,
  },
  detailTextArea: {
    height: 90,
    textAlignVertical: 'top',
  },
  authorTextArea: {
    height: 70,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    width: '90%',
    borderWidth: 0.75,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 15,
  },
  addButton: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 10,
  },
  imagePickerButton: {
    borderWidth: 0.75,
    borderColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 10,
    width: '90%',
    alignItems: 'center',
  },
  imagePickerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  imagePreview: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginVertical: 10,
  },
});
