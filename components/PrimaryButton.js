import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useTheme } from "../src/ThemeContext";

const PrimaryButton = ({ onPress, title, updateInfo,download }) => {
  const {isDarkMode} = useTheme();

  const backgroundStyle = {
    backgroundColor: isDarkMode ? "#09FBD3": "#4D0F28"
  }
  return (
    <>
      {onPress && (
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
      )}

      {updateInfo && (
        <TouchableOpacity onPress={updateInfo} style={[styles.updateBtn,backgroundStyle]}>
          <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
      )}

      {download && (
        <TouchableOpacity onPress={download} style={styles.downloadbtn}>
          <Text style={styles.btnText}>{title}</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

export default PrimaryButton;

const styles = StyleSheet.create({
  btn: {
    width: "95%",
    height: 50,
    backgroundColor: "#09FBD3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  updateBtn: {
    width: "45%",
    height: 50,
    backgroundColor: "#09FBD3",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  downloadbtn: {
    width: "85%",
    height: 50,
    backgroundColor: "#4D0F28",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
