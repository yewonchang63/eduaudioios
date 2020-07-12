import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Modal,
  ImagePropTypes,
  FlatList,
} from "react-native";
import * as Speech from "expo-speech";

const NotesItem = (props) => {
  const [speechrate, setspeechrate] = useState(1);

  const cancelNotes = () => {
    props.onCancel();
  };
  const speak = (content, obj) => {
    Speech.stop();
    Speech.speak(content, obj);
  };

  const startButton = () => {
    Speech.stop();
    speak("hello we are going to talk about euclid's algorithm today", {
      rate: speechrate,
    });
  };
  const pauseButton = () => {
    Speech.pause();
  };
  const resumeButton = () => {
    Speech.resume({ rate: speechrate });
  };
  const slowpressed = () => {
    setspeechrate(0.6);
    speak("slow", { rate: 0.5 });
  };
  const mediumpressed = () => {
    setspeechrate(0.8);
    speak("medium", { rate: 0.7 });
  };
  const fastpressed = () => {
    setspeechrate(1.1);
    speak("fast", { rate: 1.1 });
  };
  let content = props.itemContent;
  return (
    <Modal visible={props.visible}>
      <View style={styles.header}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.cancelbutton} onPress={cancelNotes}>
            <Text style={{ fontSize: 17 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>My Notes</Text>
      </View>

      <View style={styles.container}>
        <Text style={{ fontSize: 25, width: "93%" }}>
          "hello we are going to talk about euclid's algorithm today"
        </Text>
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
  listItems: {
    alignItems: "center",
    alignContent: "center",
    width: "80%",
    borderWidth: 1,
    borderColor: "black",
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 30,
    alignContent: "center",
    alignItems: "center",
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  screen: {
    flex: 1,
    backgroundColor: "white",
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
  },
  cancelbutton: {
    width: 70,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 30,
    paddingLeft: 10,
    borderBottomEndRadius: 50,
    borderBottomStartRadius: 50,
    borderTopEndRadius: 50,
    borderTopStartRadius: 50,
  },
  cancel: {
    justifyContent: "flex-start",
    marginRight: 82,
    marginLeft: 7,
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

export default NotesItem;
