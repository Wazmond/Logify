import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from "react-native";
import React, { useEffect, useRef } from "react";
import firebase from "firebase/compat/app";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";

const Profile = () => {
  return (
    <SafeAreaView>
      <View>
        <Text style={styles.title}>Logify</Text>
      </View>

      {/* <View>
        <Text>
          Want to access your data on a different device? Or to save your data?
        </Text>
      </View> */}

      <View style={{marginVertical: 'auto'}}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email address"
            style={styles.inputBox}
          />
          <TextInput placeholder="Password" style={styles.inputBox} />
          <TouchableHighlight
            activeOpacity={0.5}
            underlayColor={"#24a0ed"}
            style={styles.button}
            onPress={() => {}}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>

        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"#ffffff"}
          style={{}}
          onPress={() => {}}
        >
          <View>
            <Text>Sign Up</Text>
          </View>
        </TouchableHighlight>
{/* 
        <TouchableHighlight
          activeOpacity={0.5}
          underlayColor={"#ffffff"}
          style={{}}
          onPress={() => {}}
        >
          <Text>Continue as guest</Text>
        </TouchableHighlight> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    gap: 10,
  },
  inputBox: {
    width: "100%",
    fontSize: 20,
    padding: 15,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  },
  button: {
    width: "30%",
    paddingVertical: 5,
    backgroundColor: "#24a0ed",
    borderRadius: 12.5,
  },
  buttonText: {
    fontSize: 20,
    // marginVertical: 'auto',
    textAlign: "center",
    color: "#ffffff",
  },
});
