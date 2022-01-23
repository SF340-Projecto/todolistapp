import React from 'react';
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
  Alert,
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProviders';

const { width } = Dimensions.get('window');

export default function AddCatagoriesButton() {
  const {user} = useContext(AuthContext);
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  // This is to manage TextInput State
  const [topic, topicInput] = useState('');

  let CategoriesRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('NameCategories');

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    if (topic != '') {
      CategoriesRef.add({
        name: topic,
      });
      topicInput('');
    }
  };
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={toggleModalVisibility}>
          <Text style={styles.loginButtonText}>Add Categories</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.viewWrapper}>
          <View style={styles.modalView}>
            <Text>Categories Name</Text>
            <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.textInput}
              onChangeText={topic => topicInput(topic)}
            />
            {/** This button is responsible to close the modal */}
            <Button title="Done" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loginButton: {
    marginVertical: 20,
    backgroundColor: '#fff',
    width: 200,
    height: 100,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#25ced1',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 6,
    justifyContent: 'center',
  },viewWrapper: {
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
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 400,
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
