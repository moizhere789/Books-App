import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useTheme } from "../ThemeContext";

const TextField = ({
  placeholder,
  value,
  onChangeText,
  keyboardType,
  search,
  error,
  placeHolder,
}) => {
  const [visible, setIsVisible] = useState(false);

  const { isDarkMode } = useTheme();

  const borderStyle = {
    borderColor: isDarkMode ? "#fff" : "grey",
  };

  return (
    <>
      {keyboardType === "default" && (
        <>
          <View style={styles.nameErrorView}>
            <View style={styles.nameInputView}>
              <TextInput
                placeholder={placeholder}
                keyboardType={keyboardType}
                onChangeText={onChangeText}
                value={value}
                style={styles.nameInput}
                placeholderTextColor={"#fff"}
                color={"#fff"}
              />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </>
      )}

      {keyboardType === "email" && (
        <>
          <View style={styles.inputView}>
            <MaterialIcons name="email" size={24} color="#fff" />
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              value={value}
              style={styles.input}
              placeholderTextColor={"#fff"}
              color={"#fff"}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.errorView}>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </>
      )}

      {placeHolder && (
        <>
          <View style={[styles.updateNameView,borderStyle]}>
            <TextInput
              placeholder={placeHolder}
              onChangeText={onChangeText}
              value={value}
              style={styles.updatenameinput}
              placeholderTextColor={isDarkMode ? "#fff" : "grey"}
              color={isDarkMode ? "#fff" : "grey"}
            />
          </View>
        </>
      )}

      {keyboardType === "password" && (
        <>
          <View style={styles.inputView}>
            <FontAwesome name="lock" size={24} color="#fff" />
            <TextInput
              placeholder={placeholder}
              keyboardType={keyboardType}
              onChangeText={onChangeText}
              value={value}
              style={styles.input}
              placeholderTextColor={"#fff"}
              color={"#fff"}
              secureTextEntry={!visible}
              autoCapitalize="none"
            />
            <TouchableOpacity onPress={() => setIsVisible(!visible)}>
              <Entypo
                name={visible ? "eye-with-line" : "eye"}
                size={24}
                color="#fff"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.errorView}>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        </>
      )}

      {search && (
        <View
          style={[
            styles.searchView,
            { opacity: isDarkMode ? 1 : 0.7 },
            { backgroundColor: isDarkMode ? "lightgrey" : "#C4C4C4" },
          ]}
        >
          <AntDesign name={search} size={20} color="grey" />
          <TextInput
            placeholder={placeholder}
            onChangeText={onChangeText}
            value={value}
            style={styles.searchInput}
          />
          <TouchableOpacity>
            <FontAwesome name="microphone" size={20} color="grey" />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default TextField;

const styles = StyleSheet.create({
  nameInputView: {
    width: "100%",
    borderWidth: 0.75,
    borderColor: "grey",
    borderRadius: 10,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  inputView: {
    width: "95%",
    height: 50,
    borderWidth: 0.75,
    borderColor: "grey",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  input: {
    width: "83%",
    height: 40,
    justifyContent: "center",
    paddingHorizontal: 10,
  },
  searchView: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    backgroundColor: "#C4C4C4",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 10,
  },
  searchInput: {
    width: "83%",
    height: 40,
    alignItems: "center",
    fontSize: 16,
  },
  errorText: {
    color: "red",
    paddingHorizontal: 5,
  },
  errorView: {
    width: "90%",
  },
  nameErrorView: {
    width: "65%",
    gap: 10,
  },
  nameInput: {
    width: "60%",
    height: 50,
  },
  updateNameView: {
    width: "40%",
    height: 50,
    borderWidth: 0.75,
    // borderColor: "grey",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
  },
  updatenameinput: {
    width: "100%",
    height: 40,
  },
});
