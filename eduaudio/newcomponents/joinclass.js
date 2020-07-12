import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  TextInput,
  Image,
} from "react-native";
import * as Speech from "expo-speech";

import LiveLecture from "./livelecture";
const joinclass = (props) => {
  const speak = (name) => {
    Speech.stop();
    Speech.speak(name, { rate: 1, pitch: 0.9 });
  };
  const [classIDEntered, setClassIdEntered] = useState("");

  const [classed, setclassed] = useState(false);

  const classID = (enteredID) => {
    console.log(enteredID);

    setClassIdEntered(enteredID);
  };
  const canceljoining = () => {
    props.onCancel();
  };
  const enteringclassid = () => {
    speak("Enter class I D");
  };
  const getout = () => {
    setclassed(false);
    speak("leave lecturer");
  };
  const joinButtonPressed = () => {
    if (classIDEntered.length === 0) {
      alert("No class ID entered!");
      speak("nO CLASS ID ENTERED");
      return;
    }
    speak("join class ID B W U B C");
    setClassIdEntered("");
    setclassed(true);
  };
  return (
    <Modal visible={props.visible}>
      <View style={styles.header}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.cancelbutton} onPress={canceljoining}>
            <Text style={{ fontSize: 17 }}>Back</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.headerTitle}>Join a Lecture Session</Text>
      </View>
      <View style={styles.screen}>
        <View style={styles.text}>
          <TextInput
            placeholder="Enter class ID"
            style={styles.idInput}
            onChangeText={classID}
            value={classIDEntered}
            onTouchStart={enteringclassid}
          />

          <TouchableOpacity style={styles.button} onPress={joinButtonPressed}>
            <Text style={{ fontSize: 40 }}>Join</Text>
          </TouchableOpacity>
          <Image
            source={require("../assets/lec.png")}
            style={{ width: 300, height: 300, marginTop: 50 }}
          />
        </View>
      </View>
      <LiveLecture
        visible={classed}
        onCancel={getout}
        classname={classIDEntered}
      />
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
    marginLeft: 5,
  },
  cancelbutton: {
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
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
});

export default joinclass;
