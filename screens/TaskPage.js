import {StatusBar} from 'expo-status-bar';
import React, {useState} from 'react';
import {useContext, useEffect} from 'react';
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Modal,
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProviders';

import GetTaskData from '../firestore/getTaskData';

const {width} = Dimensions.get('window');

export default function TaskPage({navigation}) {
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  // This is to manage TextInput State
  const [topic, topicInput] = useState('');
  const [detailTask, detailTaskInput] = useState('');
  const {user, logout} = useContext(AuthContext);
  let usersCollectionRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('Task');

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    if (topic != '' && detailTask != '') {
      usersCollectionRef.add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        topic: topic,
        taskDetail: detailTask,
      });
      topicInput('');
      detailTaskInput('');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      {/**  Displays Task Data */}
      <GetTaskData />

      {/**  We are going to create a Modal with Text Input. */}
      <Button title="ADD TASk" onPress={toggleModalVisibility} />

      {/** This is our modal component containing textinput and a button */}
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text>Topic</Text>
            <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.textInput}
              onChangeText={topic => topicInput(topic)}
            />
            <Text>Detail Task</Text>
            <TextInput
              placeholder="Enter something..."
              value={detailTask}
              style={styles.textInput}
              onChangeText={detailTask => detailTaskInput(detailTask)}
            />

            {/** This button is responsible to close the modal */}
            <Button title="Done" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>

      <TouchableOpacity style={styles.logoutButton} onPress={() => logout()}>
        <Text style={styles.loginButtonText}>Logout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('getTaskData')}>
        <Text style={styles.loginButtonText}>GetData</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// These are user defined styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  viewWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  modalView: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    elevation: 5,
    transform: [{translateX: -(width * 0.4)}, {translateY: -90}],
    height: 220,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
  textInput: {
    width: '80%',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    borderWidth: 1,
    marginBottom: 8,
  },
});
