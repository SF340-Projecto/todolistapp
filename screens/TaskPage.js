import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { useContext } from 'react';
import {
  Button, SafeAreaView, StyleSheet, Modal,
  View, TextInput, Dimensions, Text, TouchableOpacity
} from "react-native";
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProviders';


const { width } = Dimensions.get("window");

export default function App() {

  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);

  // This is to manage TextInput State
  const [topic, topicInput] = useState("");
  const [detailTask, detailTaskInput] = useState("");

  // This is user data from firebase
  const { user, logout } = useContext(AuthContext);

  // This call firestore collection for store Tasklist 
  let usersCollectionRef = firestore().collection("user").doc(user.uid).collection("Task");


  // This function call when user click done after input data task
  // This function will send data to firebase 
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    if (topic != "" && detailTask != "") {
      usersCollectionRef
        .add({
          timestamp: firestore.FieldValue.serverTimestamp(),
          topic: topic,
          taskDetail: detailTask
        })
      topicInput("");
      detailTaskInput("");
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="auto" />

      {/**  We are going to create a Modal with Text Input. */}
      <Button title="ADD TASk" onPress={toggleModalVisibility} />

      {/** This is our modal component containing textinput and a button */}
      <Modal animationType="slide"
        transparent visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>

            {/*This is Topic text input*/}
            <Text>Topic</Text>
            <TextInput placeholder="Enter something..."
              value={topic} style={styles.textInput}
              onChangeText={(topic) => topicInput(topic)} />

             {/*This is Detail Task text input*/}
            <Text>Detail Task</Text>
            <TextInput placeholder="Enter something..."
              value={detailTask} style={styles.textInput}
              onChangeText={(detailTask) => detailTaskInput(detailTask)} />

            {/** This button is responsible to close the modal */}
            <Button title="Done" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>

      {/*This is Button Log out*/}
      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.loginButtonText}>
          Logout
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// These are user defined styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  viewWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  modalView: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    elevation: 5,
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 220,
    width: width * 0.8,
    backgroundColor: "#fff",
    borderRadius: 7,
  },
  textInput: {
    width: "80%",
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: "rgba(0, 0, 0, 0.2)",
    borderWidth: 1,
    marginBottom: 8,
  },
});