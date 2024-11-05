import { Modal, SafeAreaView,StyleSheet,View } from 'react-native'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import CustomHeader from '../components/CustomHeader'
import { useTheme } from '../src/ThemeContext'
import MyBooksList from '../lists/MyBooksList'
import AddBookModal from '../components/AddBookModal'

const MyBooksScreen = ({navigation}) => {
  const { isDarkMode } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleBookmarkPress = (item) => {
    navigation.navigate('BookDetailScreen', { item });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
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
    style={{ opacity: 0.95, flex: 1 }}
  >
    <SafeAreaView style={styles.container}>
        <View style={styles.headerView}>
          <CustomHeader plus={'plus'} title={'My Books'} onPress={toggleModal}/>
        </View>

        <View style={styles.booksView}>
        <MyBooksList onPress={handleBookmarkPress} />
        </View>

        
        <Modal
          transparent={true}
          animationType="slide"
          visible={modalVisible}
          onRequestClose={toggleModal}
        >
          <AddBookModal closeModal={toggleModal} />
        </Modal>

        </SafeAreaView>
        </LinearGradient>
  )
}

export default MyBooksScreen

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems:'center'
      },
      scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        paddingBottom: 65,
      },
      headerView: {
        width: "90%",
      },
      booksView:{
        width:'90%'
      }
})