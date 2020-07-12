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
  SafeAreaView,
} from "react-native";

import NotesItem from "./notesitem";
import { speak } from "expo-speech";
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

// readUserData() {
//   firebase.database().ref('Users/').once('value', function (snapshot) {
//       console.log(snapshot.val())
//   });
// }

const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);
const titleRef = firebase.database().ref("notes").child("IKEAZ");

const fireRef = titleRef.child("-MC1Vx1PAvbK3R0_OwP8");

const mynotes = (props) => {
  const [selectedId, setSelectedId] = useState(null);
  const [selectnote, setselectnote] = useState(false);
  const [title, settitle] = useState("");
  const [notesdisplay, setnotesdisplay] = useState("");

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Lecture 1",
    },
    {
      id: "dfsdkflj-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Lecture 2",
    },
    {
      id: "dfsdfasd-c1b1-46c2-aed5-3ad53abb28ba",
      title: "Lecture 3",
    },
  ];

  const renderItem = ({ item }) => {
    const backgroundColor = item.id === selectedId ? "#b0e0e6" : "#b0e0e6";
    const notePressed = (notetitle) => {
      speak(notetitle, { rate: 0.78, pitch: 0.8 });
      setselectnote(true);
      settitle(notetitle);
      fireRef.on("value", (snapshot) => {
        const notes = [];
        snapshot.forEach((doc) => {
          notes.push({
            key: doc,
          });
        });
      });
    };
    return (
      <Item
        item={item}
        onPress={() => notePressed(item.title)}
        style={{ backgroundColor }}
      />
    );
  };
  const cancelnotes = () => {
    fireRef.on("value", (snapshot) => {
      const notes = [];
      snapshot.forEach((doc) => {
        notes.push({
          key: doc,
        });
      });
    });

    props.onCancel();
  };

  const comebacktolist = () => {
    speak("back to my notes list");
    setselectnote(false);
  };

  return (
    <Modal visible={props.visible}>
      <View style={styles.header}>
        <View style={styles.cancel}>
          <TouchableOpacity style={styles.cancelbutton} onPress={cancelnotes}>
            <Text style={{ fontSize: 17 }}>Back</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.headerTitle}>My Notes</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </View>
      <NotesItem
        visible={selectnote}
        itemID={title}
        onCancel={comebacktolist}
        itemContent={notesdisplay}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
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
});
//   const cancelnotes = () => {
//     props.onCancel();
//   };

//   const [lectureCollection, setlectureCollection] = useState(["lec1"]);

//   const addLectures = (lectureTitle) => {
//     setlectureCollection((lectureCollection) => [
//       ...lectureCollection,
//       { key: Math.random().toString(), value: lectureTitle },
//     ]);
//   };
//   return (
//     <Modal visible={props.visible}>
//       <View style={styles.header}>
//         <View style={styles.cancel}>
//           <TouchableOpacity style={styles.cancelbutton} onPress={cancelnotes}>
//             <Text style={{ fontSize: 17 }}>Cancel</Text>
//           </TouchableOpacity>
//         </View>
//         <Text style={styles.headerTitle}>My Notes</Text>
//       </View>
//       <View>
//         <FlatList
//           keyExtractor={(item, index) => item.id}
//           data={lectureCollection}
//           renderItem={(itemData) => (
//             <NotesItem
//               id={itemData.item.key}
//               // onPress={removeGoalHandler}
//               title={itemData.item.titled}
//             />
//           )}
//         />
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   screen: {
//     flex: 1,
//     backgroundColor: "white",
//   },
//   header: {
//     width: "100%",
//     height: 90,
//     paddingTop: 36,
//     backgroundColor: "#ffebcd",
//     alignItems: "center",
//     justifyContent: "flex-start",
//     flexDirection: "row",
//   },
//   headerTitle: {
//     color: "black",
//     fontWeight: "bold",
//     fontSize: 20,
//   },
//   cancelbutton: {
//     width: 70,
//     height: 50,
//     alignItems: "center",
//     justifyContent: "center",
//     marginVertical: 30,
//     paddingLeft: 10,
//     borderBottomEndRadius: 50,
//     borderBottomStartRadius: 50,
//     borderTopEndRadius: 50,
//     borderTopStartRadius: 50,
//   },
//   cancel: {
//     justifyContent: "flex-start",
//     marginRight: 82,
//     marginLeft: 7,
//   },
// });
export default mynotes;
