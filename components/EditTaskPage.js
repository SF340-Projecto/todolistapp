import React from 'react';
import {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import {ModalPickerDropdow} from '../screens/ModalPickerDropdow';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import { AuthContext } from '../navigation/AuthProviders';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import styles from '../screens/component.style.js';

const {width} = Dimensions.get('window');

function EditTaskPage(props) {
  const [topic, topicInput] = useState('');
  const [detailTask, detailTaskInput] = useState('');
  const [dataTask, setDataTask] = useState([]);
  const [urlUser, setUrl] = useState('');
  const [chooseData, setchooseData] = useState('SELECT CATEGORY...');
  const [isModalVisible_d, setisModalVisible_d] = useState(false); //
  const [uploading, setUploading] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const [transferred, setTransferred] = useState(0);

  const [selectedValue, setSelectedValue] = useState('0');
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [docID, setDocId] = useState('');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());

  const [textDate, setText] = useState('CHOOSE DUE DATE...');
  const [textTime, setTime] = useState('CHOOSE DUE TIME...');
  const [mode, setMode] = useState('date');

  const changeModalVisibility = bool => {
    setisModalVisible_d(bool);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + ' Minutes:' + tempDate.getMinutes();
    setText(fDate)
    setTime(fTime)
  };

  const setData = option_drop => {
    setchooseData(option_drop);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };
  

  // Select image and get url firebase storage //
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchImageLibrary(options, response => {
      // Use launchImageLibrary to open image gallery
      //console.log('Response = ', response.assets[0].uri);

      if (response.didCancel) {
        // console.log('User cancelled image picker');
      } else if (response.error) {
        // console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        //  console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.uri};

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const uri = response.assets[0].uri;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        const placeUrl = user.uid + '/' + 'task' + '/' + filename;
        //  console.log(placeUrl);

        setUploading(true);
        setTransferred(0);
        const task = storage().ref(placeUrl).putFile(uploadUri);
        // set progress state

        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,
          );
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            //  console.log('File available at', downloadURL);
            setUrl(downloadURL);
            //   console.log('Checkkkk  ', downloadURL);
          });
        });
        setUploading(false);
        Alert.alert('Photo uploaded!', 'Your photo has been uploaded');
        setImage(null);
        setUrl('');
      }
    });
  };

  // Function call to update task list
  const updateTasklist = userDocId => {
    // Set doc id
    // Call firebase to update
    if (topic != '' && detailTask != '') {
      const userCollection1 = firestore()
        .collection('user')
        .doc(user.uid)
        .collection('Task')
        .doc(userDocId);
      // set new data
      userCollection1.set({
        timestamp: firestore.FieldValue.serverTimestamp(),
        topic: topic,
        taskDetail: detailTask,
        urlPhoto: urlUser,
        date: date,
        textDate: textDate,
        textTime: textTime,
        priority: selectedValue,
      });
      // Set data to null
      topicInput('');
      detailTaskInput('');
      setDataTask(dataTask);
      setDocId('');
      setUrl('');
      setSelectedValue('0');
    }
    props.modalEdit(false);

  };
  console.log(props.item)

  return (
    <View style={styles.bg_modal}>
      <View style={styles.paper_madal}>
        <ScrollView>
          <Text style={styles.text_normal}>EDIT TASK</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.input}
              onChangeText={topic => topicInput(topic)}
            />
          </View>

          <Text style={styles.text_normal}>Detail Task</Text>
          <View style={{alignItems: 'center'}}>
            <TextInput
              placeholder="Enter something..."
              value={detailTask}
              style={styles.input2}
              multiline={true}
              numberOfLines={4}
              onChangeText={detailTask => detailTaskInput(detailTask)}
            />
          </View>

          <Text style={styles.text_normal}>Priority : </Text>
          <Picker
            selectedValue={selectedValue}
            style={{height: 50, width: 300}}
            onValueChange={(itemValue, itemIndex) =>
              setSelectedValue(itemValue)
            }>
            <Picker.Item label="None" value="0" />
            <Picker.Item label="Low" value="1" />
            <Picker.Item label="Medium" value="2" />
            <Picker.Item label="High" value="3" />
          </Picker>

          <View>
            {/* <Text style={styles.pickedDate}>{date.toString()}</Text>
                        <View>
                          <Button onPress={showDatepicker} title="Show date picker!" />
                        </View>
                        <View>
                          <Button onPress={showTimepicker} title="Show time picker!" />
                        </View> */}
            {show && (
              <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChange}
              />
            )}
            <Text style={styles.text_normal}>DUE DATE</Text>
          </View>
          {/* --------------------Date-------------------- */}
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <View style={styles.input_f}>
              <TouchableHighlight onPress={showDatepicker}>
                <Image
                  style={styles.logo}
                  source={require('../screens/img/calendar.png')}
                />
              </TouchableHighlight>
              <Text style={styles.style_text_date}>{textDate}</Text>
            </View>
          </View>
          {/* ---------------Time--------------- */}
          <View style={{alignItems: 'center'}}>
            <View style={styles.input_f}>
              <TouchableHighlight onPress={showTimepicker}>
                <Image
                  style={styles.logo}
                  source={require('../screens/img/time.png')}
                />
              </TouchableHighlight>
              <Text style={styles.style_text_date}>{textTime}</Text>
            </View>
          </View>
          <Text style={styles.text_normal}>CATEGORY</Text>

          <View style={{alignItems: 'center'}}>
            <View style={styles.input_f}>
              <TouchableOpacity onPress={() => changeModalVisibility(true)}>
                <Image
                  style={styles.logo}
                  source={require('../screens/img/dropdown.png')}
                />
              </TouchableOpacity>
              <Text style={styles.style_text_date}>{chooseData}</Text>
              <Modal
                transparent={true}
                animationType="fade"
                visible={isModalVisible_d}
                nRequestClose={() => changeModalVisibility(false)}>
                <ModalPickerDropdow
                  changeModalVisibility={changeModalVisibility}
                  // -----------------value is setData-------------
                  setData={setData}
                />
              </Modal>
            </View>
          </View>
          <Text style={styles.text_normal}>ADD PICTURE</Text>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                style={styles.logoPic}
                source={require('../screens/img/picture.png')}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            {image !== null ? (
              <Image source={{uri: image.uri}} style={styles.imageBox} />
            ) : null}
            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : null}
          </View>
          <View style={styles.style_flex_button}>
            <TouchableOpacity
              style={styles.addButtonL}
              onPress={() => {
                props.modalEdit(false);
              }}>
              <Text style={styles.addButtonText1}>CANCEL</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.addButtonR}
              onPress={() => {
                updateTasklist(props.item);
              }}>
              <Text style={styles.addButtonText1}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}


export default EditTaskPage;
