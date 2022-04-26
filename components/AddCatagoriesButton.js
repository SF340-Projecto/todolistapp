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
import {AuthContext} from '../navigation/AuthProviders';
import styles from '../screens/component.style.js';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from '../config/themeContext';
// Redux
import {useSelector, useDispatch} from 'react-redux';
import {createCategorie } from '../redux/actions/categorieAction';

const { width } = Dimensions.get('window');
var value = ''

export default function AddCatagoriesButton() {
  const {user} = useContext(AuthContext);
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  // This is to manage TextInput State
  const [topic, topicInput] = useState(null);
  const dispatch = useDispatch();
  const user_id = useSelector(state => state.data.user[0]['_id']);

  // This is to manage TextInput State
  const theme = useContext(themeContext);


  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
  };

  const createCategories = () => {
    if(topic != null){
      dispatch(createCategorie(user_id, topic))
      topicInput(null)
    }
    setModalVisible(!isModalVisible);
  }


  const cancelAdd = () => {
    setModalVisible(!isModalVisible);
  }
  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity onPress={toggleModalVisibility} style={{margin: 30,}}>
          <Text style={styles.loginButtonText}>ADD CATEGORYS</Text>
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
          <View style={[styles.paper_madal, {backgroundColor: theme.backgroundColor}]}>

          <View style={styles.closeDetailContainer}>
            <TouchableOpacity
              onPress={() => { cancelAdd() }}
              >
              <FontAwesome name="close" color={'white'} size={18}  />
            </TouchableOpacity>
          </View>
            <Text style={[styles.text_normal, {color: theme.fontColor}]} >Categories Name</Text> 
            <View style={{ alignItems: 'center' }}>
              <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.input}
              onChangeText={topic => topicInput(topic)}
              />
            </View>
            <View style={{paddingBottom:40}}>
              
            </View>
            {/* <Text style={[styles.text_normal, {color: theme.fontColor}]}>
                CATEGORY COLOR
            </Text> */}


            {/* color button */}
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
            <View style={{alignItems:'center'}}>

                <TouchableOpacity style={styles.addButtonR} onPress={createCategories}>
                    <Text style={styles.addButtonText_cat}>OK</Text>
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
