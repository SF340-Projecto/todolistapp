import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useContext, useEffect} from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  TouchableHighlight,
  Dimensions,
  Alert,

} from 'react-native';
import {ModalPickerDropdow} from '../screens/ModalPickerDropdow';
import {ScrollView} from 'react-native-gesture-handler';
import {Picker} from '@react-native-picker/picker';
import themeContext from '../config/themeContext';
import PushNotification from 'react-native-push-notification';
import { launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {addTaskList} from '../redux/actions/todoActions';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styles from '../css/AddTaskPage';

const {width} = Dimensions.get('window');

function AddTaskPage(props) {

  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState('0');
  const [isModalVisible, setModalVisible] = useState(false);
  const [chooseData, setchooseData] = useState('SELECT CATEGORY...');
  const [isModalVisible_d, setisModalVisible_d] = useState(false); //
  const theme = useContext(themeContext);
  const [mode, setMode] = useState('date');
  const [docID, setDocId] = useState('');

  const [show, setShow] = useState(false);
  const [textDate, setText] = useState('CHOOSE DUE DATE...');
  const [textTime, setTime] = useState('CHOOSE DUE TIME...');
  const [date, setDate] = useState(new Date());
  const [transferred, setTransferred] = useState(0);

  const [urlUser, setUrl] = useState('https://www.unityhighschool.org/wp-content/uploads/2014/08/default-placeholder.png');
  const [topic, topicInput] = useState('');
  const [detailTask, detailTaskInput] = useState('');
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);

  const [checkPic, setCheckPic] = useState(false);
  
  const user_id = useSelector(state => state.data.user[0]['_id']);

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const setData = option_drop => {
    setchooseData(option_drop);
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



  // Select image and get url firebase storage //
  const selectImage = () => {
    //setCheckPic(true)
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    }
    
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

  const changeModalVisibility = bool => {
    setisModalVisible_d(bool);
  };

  const addTask = async () => {
    //setCheckPic(false);
    setModalVisible(!isModalVisible);
    console.log(urlUser)
    dispatch(addTaskList(
      user_id,
      mode,
      selectedValue,
      detailTask,
      textDate,
      date,
      textTime,
      topic,
      urlUser,
      ))

  }


  // Open toggle add task and add data to firebase
  const toggleModalVisibility = (userDocId, check) => {
    setModalVisible(!isModalVisible);
    setDocId(userDocId);
    console.log(check);

    // Check condition and send to firebase
    if (topic != '' && detailTask != '') {
     

      topicInput('');
      detailTaskInput('');
      setUrl('https://www.unityhighschool.org/wp-content/uploads/2014/08/default-placeholder.png');
      setSelectedValue('0');

      PushNotification.localNotificationSchedule({
        channelId: 'test-channel',
        id: '123',
        title: topic + date,
        message: new Date(Date.now()).toString(),
        date: date,
        allowWhileIdle: true,
      });
    }
  };


  return (
    <View>
      <View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity
            style={[styles.addButton, {backgroundColor: theme.buttonColor}]}
            onPress={toggleModalVisibility}>
            <Text style={[styles.addButtonText, {color: theme.fontColor}]}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/** This is our modal component containing textinput and a button */}

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        presentationStyle="overFullScreen"
        onDismiss={toggleModalVisibility}>
        <View style={styles.bg_modal}>
          <View style={styles.paper_madal}>
          <View style={styles.closeDetailContainer}>
            <TouchableOpacity
              onPress={() => {setModalVisible(!isModalVisible)}}
              >
              <FontAwesome name="close" color={'white'} size={18} />
            </TouchableOpacity>
          </View>
            <ScrollView>
            
            
              <Text style={styles.text_normal}>ADD TASK</Text>
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

              <View style={styles.priority}>
                <Text style={styles.text_normal}>Priority : </Text>
              <Picker
                    selectedValue={selectedValue}
                    style={styles.priority_select}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedValue(itemValue)}>

                    <Picker.Item label="None" value="0" />
                    <Picker.Item label="Low" value="1" />
                    <Picker.Item label="Medium" value="2" />
                    <Picker.Item label="High" value="3" />
                  </Picker>
              </View>

              
              
              
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
              {/* --------------------Date-------------------- */}
              <View style={{alignItems: 'center', paddingBottom: 10}}>
                <View style={styles.input_f}>
                  <TouchableHighlight onPress={() => showMode('date')}>
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
                  <TouchableHighlight onPress={() => showMode('time')}>
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

              {/* </View> */}
              <Text style={styles.text_normal}>ADD PICTURE</Text>
              <View style={{alignItems: 'center'}}>
                <TouchableOpacity            
                onPress={selectImage}>
                <Image
                    style={styles.logoPic}
                    source={{uri: urlUser}}
                  />
              <View style={{alignItems:'center'}}>
                </View>
                </TouchableOpacity>
              </View>
                

              
              <View style={styles.imageContainer}>
                {image !== null ? (
                  <Image source={{uri: image.uri}} style={styles.imageBox} />
                ) : null}
                {uploading ? (
                  <View style={styles.progressBarContainer}>
                    <Progress.Bar progress={transferred} width={300} 
                   
                    />
                  </View>
                ) : null}
              </View>

              <View style={{alignItems:'center'}}>
                <TouchableOpacity
                  style={styles.addButtonR}
                  onPress={()=>{addTask(); }}>
                  <Text style={styles.addButtonText1}>SAVE</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

    </View>
  );
}

export default AddTaskPage;
