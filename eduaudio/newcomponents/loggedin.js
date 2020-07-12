import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import * as Speech from "expo-speech";
import JoinClass from "./joinclass";
import MyClass from "./mynotes";
const LoggdIn = (props) => {
  const [join, setjoin] = useState(false);
  const [notes, setnotes] = useState(false);

  const joinclassButtonPressed = () => {
    setjoin(true);
    speak("join class");

    props.onbuttonpress();
  };
  const speak = (name) => {
    Speech.stop();
    Speech.speak(name, { rate: 1, pitch: 0.9 });
  };
  const mynotesButtonPressed = () => {
    setnotes(true);
    speak("my notes");

    props.onbuttonpress();
  };
  //when we cancel from join class
  const joincancel = () => {
    setjoin(false);
    speak("cancel join class");
  };
  const notescancel = () => {
    setnotes(false);
    speak("cancel my notes");
  };

  //cancel button pressed from login page
  const backtologin = () => {
    props.LogCancel();
    speak("back to log in page");
  };
  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.cancelbutton} onPress={backtologin}>
            <Text style={{ fontSize: 17 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.buttonlabel}
          onPress={joinclassButtonPressed}
        >
          <Text style={{ fontSize: 50 }}>Join Class</Text>
          <Image
            source={require("../assets/joinlecture.png")}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
        <View style={styles.between}></View>
        <TouchableOpacity
          style={styles.buttonlabel}
          onPress={mynotesButtonPressed}
        >
          <Text
            style={{
              fontSize: 50,
              textAlignVertical: "center",
              justifyContent: "center",
            }}
          >
            My Notes
          </Text>
          <Image
            source={require("../assets/mynotes.png")}
            style={{ width: 200, height: 200 }}
          />
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
      <JoinClass visible={join} onCancel={joincancel} />
      <MyClass visible={notes} onCancel={notescancel} />
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffebcd",
    alignItems: "center",
    justifyContent: "center",
  },
  between: {
    height: "5%",
  },

  buttonlabel: {
    alignItems: "center",
    textAlignVertical: "center",
    alignContent: "flex-start",
    width: "90%",
    height: "40%",
    backgroundColor: "#ffffff",
    paddingVertical: "10%",
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  cancel: {
    justifyContent: "flex-start",
    marginRight: 320,
    marginBottom: 10,
  },
});

export default LoggdIn;
