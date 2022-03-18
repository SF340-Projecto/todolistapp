import React from 'react';

import {
  SafeAreaView,
  Modal,
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native';
import {useContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProviders';
import styles from '../screens/component.style.js';

const { width } = Dimensions.get('window');
var value = ''

export default function AddCatagoriesButton() {
  const {user} = useContext(AuthContext);
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  // This is to manage TextInput State
  const [topic, topicInput] = useState('');



  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);

  };

  const cancelAdd = () => {
    setModalVisible(!isModalVisible);
  }
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={toggleModalVisibility} style={{margin: 10,}}>
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



              <View style={styles.style_flexColor}>
                <TouchableHighlight
                  valueColor={'#ff0000'}
                >
                  <View style={styles.color_red}></View>
                </TouchableHighlight >
                <View style={{ paddingRight:10 }}></View>

                <TouchableHighlight
                valueColor={'#00bfff'}
                >
                  <View style={styles.color_blue}></View>
                </TouchableHighlight>
                <View style={{ paddingRight:10 }}></View>

                <TouchableHighlight 
                valueColor={'#008000'}
                >
                  <View style={styles.color_green}></View>
                </TouchableHighlight>
                <View style={{ paddingRight:10 }}></View>

                <TouchableHighlight
                valueColor={'#ffff00'}
                >
                  <View style={styles.color_yellow}></View>
                </TouchableHighlight>
                <View style={{ paddingRight:10 }}></View>

                <TouchableHighlight 
                valueColor={'#800080'}
                >
                  <View style={styles.color_purple}></View>
                </TouchableHighlight>
                <View style={{ paddingRight:10 }}></View>

              </View>
            <View>
            <View style={styles.style_flex}>
                <TouchableOpacity style={styles.addButtonL}>
                    <Text 

                    style={styles.addButtonText}
                    onPress={() => { cancelAdd() }}
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