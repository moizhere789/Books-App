import { StyleSheet, View, Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import Logo from '../assets/images/logo.svg';

const SplashScreen = ({ navigation }) => {
  const translateYValue = useRef(new Animated.Value(-200)).current; // Start above the screen

  useEffect(() => {
    // Bounce animation
    Animated.spring(translateYValue, {
      toValue: 0, // End at the center
      friction: 4, // Controls bounciness
      tension: 50, // Controls speed
      useNativeDriver: true, // Enable native driver for better performance
    }).start();

    // Navigate to GetStarted screen after 1 second
    const timeout = setTimeout(() => {
      navigation?.navigate('GetStarted');
    }, 1000);

    return () => clearTimeout(timeout); // Clean up the timer
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY: translateYValue }] }}>
        <Logo />
      </Animated.View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
