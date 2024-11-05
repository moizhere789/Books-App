import { StyleSheet, Text, TouchableOpacity, View, Switch,Image} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Feather from '@expo/vector-icons/Feather';
import { auth } from '../firebase.config'; 
import { firestore } from '../firebase.config'; 
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { useTheme } from '../src/ThemeContext'; // Adjust the path accordingly
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Entypo from '@expo/vector-icons/Entypo';


const CustomHeader = ({ menu, title, goBack, bookmark,onPress, onGoBack, plus }) => {

  const [imageUri, setImageUri] = useState(null);

  const { isDarkMode, toggleTheme } = useTheme();

  const textColor = isDarkMode ? '#fff' : '#000';
  
  const textStyle = {
    color: isDarkMode ? '#fff' : '#000',
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? '#9D9D9D' : '#f0f0f0',
  };

  const fetchUserData = () => {
    const user = auth.currentUser;

    if (!user) {
        console.log('User is not authenticated');
        return;
    }

    const q = query(collection(firestore, 'users'), where('email', '==', user.email));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
                const data = doc.data();
                setImageUri(data.profileImage || null);
            });
        }
    });

    return unsubscribe;
};

useEffect(() => {
    const unsubscribe = fetchUserData();
    return unsubscribe;
}, []);

  return (
    <>
      {menu && (
        <View style={styles.container}>
          <TouchableOpacity>
            <Feather name={menu} size={28} color={isDarkMode ? '#fff' : 'black'} />
          </TouchableOpacity>
          <View style={styles.toggleView}>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: "grey", true: '#fff' }}
              thumbColor={isDarkMode ? "#fff" : "#19191B"}
              ios_backgroundColor="#3e3e3e"
              style={styles.toggleSwitch}
            />
            {imageUri ? (
                    <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <FontAwesome5 name="user" size={30} style={[styles.placeholderImage,backgroundStyle,textStyle]} />
                        )}
          </View>
        </View>
      )}
      {plus && (
        <View style={styles.plusContainer}>
          <TouchableOpacity onPress={onPress}>
          <Entypo name={plus} size={30} color={isDarkMode ? '#fff' : 'black'} />
          </TouchableOpacity>
          <View style={styles.myBooksView}>
            <Text style={[styles.myBooksText, {color: textColor}]}>{title}</Text>
          </View>
        </View>
      )}

      {title === 'Profile' && (
        <View style={styles.profileView}>
          <Text style={[styles.profileText, {color: textColor}]}>{title}</Text>
        </View>
      )}
      {title === 'Bookmarks' && (
        <View style={styles.profileView}>
          <Text style={[styles.profileText, {color: textColor}]}>{title}</Text>
        </View>
      )}

      {goBack && (
        <>
        <View style={styles.backView}>
        <TouchableOpacity onPress={goBack}>
        <Ionicons name="arrow-back" size={28} color={isDarkMode ? '#fff' : 'black'} />
        </TouchableOpacity>
          <Text style={[styles.accountText, {color: textColor}]}>{title}</Text>
        </View>
        </>
      )}

      {bookmark && (
        <>
        <View style={styles.bookmarkView}>
        <TouchableOpacity onPress={onGoBack}>
        <Ionicons name="arrow-back" size={28} color={isDarkMode ? '#fff' : 'black'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPress}>
        <FontAwesome name={bookmark} size={28} color={isDarkMode ? '#fff' : 'black'} />
        </TouchableOpacity>
        </View>
        </>
      )}
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 75,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  toggleView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems:'center',
    gap: 10,
    paddingTop:5
  },
  toggleSwitch: {
    paddingHorizontal:10
  },
  profileView:{
    width:'100%',
  },
  profileText:{
    width:'100%',
    fontSize:25,
    fontWeight:'700',
    textAlign:'center'
  },
  image: {
    width: '27%',
    height: 50,
    borderRadius: 100,
},
placeholderImage: {
    width: '35%',
    height: 70,
    borderRadius: 100,
    backgroundColor: '#f0f0f0',
    textAlign: 'center',
    lineHeight: 70,
    color: '#aaa',
},
backView:{
  width:'100%',
  height:60,
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'row'
},
accountText:{
  width:'90%',
  fontSize:25,
  fontWeight:'700',
  textAlign:'center'
},
bookmarkView:{
  width:'90%',
  paddingTop:20,
  justifyContent:'space-between',
  alignItems:'center',
  flexDirection:'row'
},
plusContainer:{
  width: '100%',
  height: 75,
  flexDirection: 'row',
  alignItems: 'center',
},
myBooksView:{
  width:'80%',
  height:70,
  justifyContent:'center',
  alignItems:'center'
},
myBooksText:{
  fontSize:25,
  fontWeight:'700',
  textAlign:'center'
}
});
