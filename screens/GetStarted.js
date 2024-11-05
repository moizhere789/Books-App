import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import Logo from "../assets/images/logo.svg";

const GetStarted = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Onboarding
        showDone={false}
        showNext={false}
        showSkip={false}
        DotComponent={({ selected }) => {
          return (
            <View
              style={{
                width: selected ? 32 : 18,
                height: 8,
                padding: selected ? 5 : 0,
                backgroundColor: selected ? "#4D0F28" : "#4D0F28",
                opacity: selected ? 1 : 0.15,
                bottom: 50,
                borderRadius: selected ? 20 : 100,
                marginHorizontal: 5,
              }}
            ></View>
          );
        }}
        bottomBarColor={"#fff"}
        bottomBarHeight={1}
        pages={[
          {
            backgroundColor: "#fff",
            subtitle: null,
            title: null,
            image: (
              <View style={styles.sliderView}>
                <Logo />
                <Text style={styles.titleText}>Read your favourite books</Text>
                <Text style={styles.subtitleText}>
                  All your favourites book in one place, read any book, staying
                  at home, on travelling, or anywhere else
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: "#fff",
            subtitle: null,
            title: null,
            image: (
              <View style={styles.sliderView}>
                <Logo />
                <Text style={styles.titleText}>Read your favourite books</Text>
                <Text style={styles.subtitleText}>
                  All your favourites book in one place, read any book, staying
                  at home, on travelling, or anywhere else
                </Text>
              </View>
            ),
          },
          {
            backgroundColor: "#fff",
            subtitle: null,
            title: null,
            image: (
              <View style={styles.sliderView}>
                <Logo />
                <Text style={styles.titleText}>Read your favourite books</Text>
                <Text style={styles.subtitleText}>
                  All your favourites book in one place, read any book, staying
                  at home, on travelling, or anywhere else
                </Text>
              </View>
            ),
          },
        ]}
      />

      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btnTouchable} onPress={()=>navigation?.navigate('SignupScreen')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GetStarted;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  titleText:{
    fontSize:20,
    width:'70%',
    textAlign:'center',
    fontWeight:'700'
  },
  subtitleText:{
    width:'70%',
    fontSize:14.5,
    textAlign:'center',
    color:'#9D9D9D'
  },
  sliderView:{
    width: "100%",
    alignItems: "center",
    paddingBottom: 100,
    gap: 20,
  },
  btnView:{
    width: "100%",
    alignItems: "center",
    paddingBottom: 30,
    backgroundColor: "#fff",
  },
  btnTouchable:{
    width: "40%",
    borderRadius:10,
    backgroundColor: "#4D0F28",
    height: 55,
    justifyContent: "center",
    alignItems: "center",
  },
  btnText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'500'
  }
});
