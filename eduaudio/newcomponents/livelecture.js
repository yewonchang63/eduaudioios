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
  Modal,
  ImagePropTypes,
} from "react-native";
import * as Speech from "expo-speech";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBN-e5-pkWHMXFACF_95xrwO8NqInvPknI",
  authDomain: "vandyhack-55bc4.firebaseapp.com",
  databaseURL: "https://vandyhack-55bc4.firebaseio.com",
  projectId: "vandyhack-55bc4",
  storageBucket: "vandyhack-55bc4.appspot.com",
  messagingSenderId: "155180542051",
  appId: "1:155180542051:web:ad029ccc7f22cd6a8d3056",
  measurementId: "G-7RXQ81QGGM",
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const titleRef = firebase.database().ref("sessions").child("BWUBC");

const fireRef = titleRef.child("--MC1svvyG1coFFzQ-9oQ");

const LiveLecture = (props) => {
  const getout = () => {
    props.onCancel();
  };
  const [speechrate, setspeechrate] = useState(1);

  const speak = (content, obj) => {
    Speech.stop();
    Speech.speak(content, obj);
  };
  const startButton = () => {
    speak("hello we are going to talk about euclid's algorithm today", {
      rate: speechrate,
    });
  };
  const pauseButton = () => {
    Speech.pause();
  };
  const resumeButton = () => {
    Speech.resume();
  };
  const slowpressed = () => {
    setspeechrate(0.5);
    speak("slow", { rate: 0.5 });
  };
  const mediumpressed = () => {
    setspeechrate(0.8);
    speak("medium", { rate: 0.8 });
  };
  const fastpressed = () => {
    setspeechrate(1.1);
    speak("fast", { rate: 1.1 });
  };
  const [lectureName, setlectureName] = useState("");

  return (
    <Modal visible={props.visible}>
      <View style={styles.header}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.cancelbutton} onPress={getout}>
            <Text style={{ fontSize: 17 }}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Joined Lecture</Text>
      </View>
      <View style={styles.screen}>
        <View style={styles.text}>
          <Text style={{ fontSize: 30 }}>
            hello we are going to talk about euclid's algorithm today
          </Text>
        </View>
      </View>
      <View style={styles.reader}>
        <TouchableOpacity style={styles.start} onPress={startButton}>
          <Text style={{ fontSize: 17 }}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.pause} onPress={pauseButton}>
          <Text style={{ fontSize: 17 }}>Pause</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.resume} onPress={resumeButton}>
          <Text style={{ fontSize: 17 }}>Resume</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.speed}>
        <TouchableOpacity style={styles.speedbutton} onPress={slowpressed}>
          <Text style={{ fontSize: 17 }}>Slow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.speedbutton} onPress={mediumpressed}>
          <Text style={{ fontSize: 17 }}>Medium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.speedbutton} onPress={fastpressed}>
          <Text style={{ fontSize: 17 }}>Fast</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "white",
  },
  text: {
    marginVertical: 50,
    alignItems: "center",
    alignContent: "center",
  },
  idInput: {
    alignItems: "center",
    height: 50,
    fontSize: 30,
    textAlign: "center",
    alignContent: "center",
    borderColor: "#b0e0e6",
    borderWidth: 4,
    width: "80%",
    backgroundColor: "#ffffff",
  },
  button: {
    backgroundColor: "#b0e0e6",
    width: "40%",
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
  },
  header: {
    width: "100%",
    height: 90,
    paddingTop: 36,
    backgroundColor: "#ffebcd",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  headerTitle: {
    color: "black",
    fontWeight: "bold",
    fontSize: 20,
    marginLeft: 35,
  },
  cancelbutton: {
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 0,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  cancel: {
    justifyContent: "flex-start",
    marginRight: 15,
    marginLeft: 13,
  },
  reader: {
    flexDirection: "row",
    alignContent: "flex-end",
    alignItems: "flex-end",
    justifyContent: "space-evenly",
  },
  start: {
    width: "30%",
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#8fbc8f",
    // borderBottomEndRadius: 10,
    // borderBottomStartRadius: 10,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
  },
  pause: {
    width: "30%",
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#f4a460",
    // borderBottomEndRadius: 10,
    // borderBottomStartRadius: 10,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
  },
  resume: {
    width: "30%",
    height: "35%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 5,
    backgroundColor: "#add8e6",
    // borderBottomEndRadius: 0,
    // borderBottomStartRadius: 10,
    // borderTopEndRadius: 10,
    // borderTopStartRadius: 10,
  },
  speed: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-evenly",
  },
  speedbutton: {
    width: "30%",
    height: "25%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    borderColor: "black",
    borderWidth: 2,
  },
});

export default LiveLecture;
