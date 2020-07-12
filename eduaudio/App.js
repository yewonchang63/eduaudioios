import { StatusBar } from "expo-status-bar";
import * as firebase from "firebase";
import "@firebase/auth";
import "@firebase/firestore";
import * as Speech from "expo-speech";

const firebaseConfig = {
  apiKey: "AIzaSyBN-e5-pkWHMXFACF_95xrwO8NqInvPknI",
  authDomain: "vandyhack-55bc4.firebaseapp.com",
  // databaseURL: "https://vandyhack-55bc4.firebaseio.com",
  projectId: "vandyhack-55bc4",
  storageBucket: "vandyhack-55bc4.appspot.com",
  messagingSenderId: "155180542051",
  appId: "1:155180542051:web:ad029ccc7f22cd6a8d3056",
  measurementId: "G-7RXQ81QGGM",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from "react-native";

import LoggedIn from "./newcomponents/loggedin";
import JoinClass from "./newcomponents/joinclass";
import MyNotes from "./newcomponents/mynotes";

// import * as f from "./src/firebase/config";

export default function App() {
  const [validuser, setValidUser] = useState(["BrianKim", "AliceChang"]);

  const [idEntered, setIdEntered] = useState("");
  const [pwEntered, setPwEntered] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [afterJoin, setafterJoin] = useState(false);
  const [afterMyNotes, setafterMyNotes] = useState(false);

  const IdEntered = (enteredID) => {
    //constantly updates the ID WHEN CHANGE OCCURS
    setIdEntered(enteredID);
  };

  const PwEntered = (enteredPW) => {
    //constantly updates the PW when changed
    setPwEntered(enteredPW);
  };
  const onLogInButtonPressed = () => {
    //When log-in button pressed
    speak("Log In");
    if (idEntered.length === 0) {
      alert("ID Not Entered");
      speak("please enter your I  D AND PASSWORD");
      //later implement Alert message
      return;
    }
    if (pwEntered.length === 0) {
      alert("PW Not Entered");
      speak("please enter your PASSWORD");
      //later implement Alert message
      return;
    }

    firebase
      .auth()
      .signInWithEmailAndPassword(idEntered, pwEntered)
      .catch((err) => {
        alert("ID OR PASSWORD DOES NOT EXIST");
        speak("I D OR PASSWORD DOES NOT EXIST");
        return;
      });
    Speech.speak("log in successful");
    setIsLoggedIn(true);
    setIdEntered("");
    setPwEntered("");
  };
  const backtologin = () => {
    setIsLoggedIn(false);
  };
  const buttonpressedhandler = () => {
    setafterMyNotes(true);
  };
  const joinbuttonpressed = () => {
    setafterJoin(true);
  };
  const mynotesbuttonpressed = () => {
    setafterMyNotes(true);
  };
  const speak = (name) => {
    Speech.stop();
    Speech.speak(name, { rate: 0.95, pitch: 0.9 });
  };
  /************ *********************** *********************** *********************** *********************** ************/
  const onSignInButtonPressed = () => {
    if (pwEntered.length < 6) {
      alert("Please enter at least 6 characters to protect your account");
      speak("Please enter at least 6 characters for your password");
      return;
    }

    firebase
      .auth()
      .createUserWithEmailAndPassword(idEntered, pwEntered)
      .catch((err) => {
        alert("sign up failed");
        speak("sign up failed    try again");
        return;
      });

    speak("Sign up successfull and make sure to press log in");
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 100 }}>
        <Image
          source={require("./assets/eduaudio.png")}
          style={{ width: 280, height: 280 }}
        />
      </View>

      <View style={styles.logins}>
        <TextInput
          placeholder="Enter Your ID"
          style={styles.idInput}
          onChangeText={IdEntered}
          value={idEntered}
        />
        <View style={{ height: 10 }}></View>

        <TextInput
          placeholder="Enter Your PW"
          style={styles.idInput}
          onChangeText={PwEntered}
          value={pwEntered}
        />

        <View style={{ height: 10 }}></View>
        <TouchableOpacity
          style={styles.loginbutton}
          onPress={onLogInButtonPressed}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "black",
            }}
          >
            Log In
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.signupbutton}
          onPress={onSignInButtonPressed}
        >
          <Text
            style={{
              fontSize: 17,
              fontWeight: "bold",
              color: "white",
            }}
          >
            Sign Up
          </Text>
        </TouchableOpacity>

        <MyNotes visible={afterJoin} />
        <LoggedIn
          LogCancel={backtologin}
          visible={isLoggedIn}
          onbuttonpress={buttonpressedhandler}
          joinpressed={joinbuttonpressed}
          mynotespressed={mynotesbuttonpressed}
        />

        {/* <JoinClass visible={afterMyNotes} /> */}
      </View>
    </View>
  );
}
/************ *********************** *********************** *********************** ***********/
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffebcd",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  logins: {
    width: "78%",
  },
  idInput: {
    alignItems: "center",
    height: 50,
    borderColor: "#b0e0e6",
    borderWidth: 1.5,
    padding: 10,
    width: "100%",
    backgroundColor: "#ffffff",
  },

  loginbutton: {
    alignItems: "center",
    height: 50,
    borderColor: "#b0e0e6",
    borderWidth: 1.5,
    padding: 10,
    width: "100%",
    backgroundColor: "#b0e0e6",
    justifyContent: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },

  signupbutton: {
    alignItems: "center",
    height: 50,
    marginTop: 15,
    borderColor: "#4169e1",
    borderWidth: 1.5,
    padding: 10,
    width: "100%",
    backgroundColor: "#4169e1",
    justifyContent: "center",
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
});
