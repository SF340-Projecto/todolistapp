import React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
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
import { ScrollView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import styles from '../css/component.style.js';
import { useSelector, useDispatch } from 'react-redux';
import { updateTaskList } from '../redux/actions/todoActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { updateTaskCategorie } from '../redux/actions/categorieAction';
import themeContext from '../config/themeContext';

const { width } = Dimensions.get('window');

function EditTaskPage(props) {

  const dispatch = useDispatch();
  const url = props.urlP

  const [topic, topicInput] = useState('');
  const [detailTask, detailTaskInput] = useState('');
  const [dataTask, setDataTask] = useState([]);
  const [urlUser, setUrl] = useState('https://www.unityhighschool.org/wp-content/uploads/2014/08/default-placeholder.png');
  const [isModalVisible_d, setisModalVisible_d] = useState(false); //
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);

  const [selectedValue, setSelectedValue] = useState('0');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [date, setDate] = useState(new Date());

  const [textDate, setText] = useState('CHOOSE DUE DATE...');
  const [textTime, setTime] = useState('CHOOSE DUE TIME...');
  const [mode, setMode] = useState('date');

  const user_id = useSelector(state => state.data.user[0]['_id']);
  const theme = useContext(themeContext);
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
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const uri = response.assets[0].uri;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        const placeUrl = user_id + '/' + 'task' + '/' + filename;
        console.log(placeUrl);

        setUploading(true);
        setTransferred(0);
        const task = storage().ref(placeUrl).putFile(uploadUri);
        // set progress state

        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000,

          );
          task.snapshot.ref.getDownloadURL().then(downloadURL => {
            setUrl(downloadURL);
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
  const updateTask = userDocId => {
    if (props.state) {
      dispatch(updateTaskCategorie(
        user_id,
        props.item,
        date,
        selectedValue,
        detailTask,
        textDate,
        textTime,
        "data",
        topic,
        urlUser
      ))
    }
    else {
      dispatch(updateTaskList(
        props.item,
        date,
        selectedValue,
        detailTask,
        textDate,
        textTime,
        "data",
        topic,
        urlUser
      ))
    }
    console.log("YESSSS")
    console.log(props.item)
    topicInput('');
    detailTaskInput('');
    setDataTask(dataTask);
    setUrl('https://www.unityhighschool.org/wp-content/uploads/2014/08/default-placeholder.png');
    setSelectedValue('0');
    props.modalEdit(false);
  };

  return (
    <View style={styles.bg_modal}>
      <View style={[styles.paper_madal, {backgroundColor: theme.backgroundColor}]}>
        <View style={styles.closeDetailContainer}>
          <TouchableOpacity
            onPress={() => {
              props.modalEdit(false);
            }}
          >
            <FontAwesome name="close" color={'white'} size={18} />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <Text style={[styles.text_normal, {color: theme.fontColor}]}>EDIT TASK</Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.input}
              onChangeText={topic => topicInput(topic)}
            />
          </View>

          <Text style={[styles.text_normal, {color: theme.fontColor}]}>Detail Task</Text>
          <View style={{ alignItems: 'center' }}>
            <TextInput
              placeholder="Enter something..."
              value={detailTask}
              style={styles.input2}
              multiline={true}
              numberOfLines={4}
              onChangeText={detailTask => detailTaskInput(detailTask)}
            />
          </View>
          <View style={styles.priority}>
            <Text style={[styles.text_normal, {color: theme.fontColor}]}>Priority : </Text>
            <Picker
              selectedValue={selectedValue}
              style={[styles.priority_select, {color: theme.fontColor}]}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedValue(itemValue)
              }>
              <Picker.Item style={{color: theme.backgroundColor_priority}} label="None" value="0" />
              <Picker.Item style={{color: theme.backgroundColor_priority}} label="Low" value="1" />
              <Picker.Item style={{color: theme.backgroundColor_priority}} label="Medium" value="2" />
              <Picker.Item style={{color: theme.backgroundColor_priority}} label="High" value="3" />
            </Picker>
          </View>


          <View>
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
            <Text style={[styles.text_normal, {color: theme.fontColor}]}>DUE DATE</Text>
          </View>
          {/* --------------------Date-------------------- */}
          <View style={{ alignItems: 'center', paddingBottom: 10 }}>
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
          <View style={{ alignItems: 'center' }}>
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
          <Text style={[styles.text_normal, {color: theme.fontColor}]}>ADD PICTURE</Text>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity onPress={selectImage}>
              <Image
                style={styles.logoPic}
                source={{ uri: urlUser }}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            {image !== null ? (
              <Image source={{ uri: image.uri }} style={styles.imageBox} />
            ) : null}
            {uploading ? (
              <View style={styles.progressBarContainer}>
                <Progress.Bar progress={transferred} width={300} />
              </View>
            ) : null}
          </View>
          <View style={{ alignItems: 'center' }}>
            <TouchableOpacity
              style={styles.addButtonR}
              onPress={() => {
                updateTask(props.item);
                console.log(props.item)

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
