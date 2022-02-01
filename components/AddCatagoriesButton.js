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
var value = ''

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
        timestamp: firestore.FieldValue.serverTimestamp(),
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
        onDismiss={toggleModalVisibility}
        >
        

        <View style={styles.bg_modal}>
          <View style={styles.paper_madal}>
            <Text style={styles.text_normal} >Categories Name</Text> 
            <View style={{ alignItems: 'center' }}>
              <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.input}
              onChangeText={topic => topicInput(topic)}
              />
            </View>
            <Text style={styles.text_normal}>
                CATEGORY COLOR
            </Text>

            <View>
            <View style={styles.style_flex}>
                <TouchableOpacity style={styles.addButtonL}>
                    <Text 
   //-----------------------------BUG!!----------------------
                    style={styles.addButtonText}
                    onChangeText={topic => topicInput('')}
                    onPress={setModalVisible}
                    >CANCLE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.addButtonR} onPress={toggleModalVisibility}>
                    <Text style={styles.addButtonText}>OK</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/** This button is responsible to close the modal */}
            {/* <Button title="Done" onPress={toggleModalVisibility} /> */}
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
  bg_modal: {
    backgroundColor: '#000000aa',
    flex: 1
  },
  paper_madal: {
    backgroundColor: '#ffffff',
    margin: 30,
    marginTop: 90,
    marginBottom: 90,
    padding: 20,
    borderRadius: 10,
    flex: 1
  },
  text_normal: {
    fontWeight: 'bold',
    padding: 10,
  },
  input: {
    width: '90%',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#e5f1f1',
    borderRadius: 5,
  },
  addButtonL: {
    backgroundColor: '#707070',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:20,
  },    
  addButtonR: {
    backgroundColor: '#25ced1',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom:20,
  },
  style_flex:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop:350,
    padding:35
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign:'center'
  },
});