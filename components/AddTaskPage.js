import DateTimePicker from '@react-native-community/datetimepicker';
import React, {useState, useContext, useEffect} from 'react';
import {
  Modal,
  View,
  TextInput,
  StyleSheet,
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

// These are user defined styles
const styles = StyleSheet.create({
  notiShowTaskContainer: {
    width: '100%',
    height: 30,
    backgroundColor: '#E5F1F1',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-around',
    elevation: 10,
    flexDirection: 'row',
  },
  taskdetailShowContainer: {
    margin: 12,
    marginVertical: 20,
  },
  textdetailShowTask: {
    color: 'grey',
    fontWeight: 'bold',
    fontSize: 15,
  },
  headerShowTaskContainer: {
    flex: 1,
  },
  textShowTask: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  closeDetailContainer: {
    backgroundColor: 'red',
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom:10
  },
  showDetailTaskBody: {
    flex: 1,
    flexDirection: 'column',
    alignContent: 'flex-start',
  },
  addButtonIcon: {
    marginHorizontal: 7,
    padding: 5,
    borderRadius: 10,
  },
  addButtonIcon1:{
    borderRadius: 10,
    alignItems:'center',
    backgroundColor:'red'
  },
  buttonContainerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  container: {
    paddingTop: 50,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 30,
    height: 30,
  },
  logoutText: {
    padding: 10,
    fontSize: 24,
  },
  logoutContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
    backgroundColor: 'tomato',
    borderRadius: 10,
  },
  body: {
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    // backgroundColor: '#FFFFFF',
  },
  addButtonContainer: {
    // backgroundColor: '#25ced1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,
    marginTop: 25,
  },
  addButtonText: {
    // color: '#707070',
    // fontWeight: 'bold',
    fontSize: 50,
  },
  addButton: {
    // backgroundColor: '#FFFFFF',
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    height: 70,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  header_container: {
    marginLeft: 25,
  },
  textHeader: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 75,
  },
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
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },

  bg_modal: {
    backgroundColor: '#000000aa',
    flex: 1,
  },
  paper_madal: {
    backgroundColor: '#ffffff',
    margin: 30,
    marginTop: 90,
    marginBottom: 90,
    padding: 20,
    borderRadius: 10,
    flex: 1,
    borderWidth: 15,
    borderRadius: 15,
    borderColor: '#25ced1',
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
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#e5f1f1',
    borderRadius: 5,
  },
  input2: {
    width: '90%',
    borderWidth: 1,
    padding: 20,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#e5f1f1',
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  style_text_date: {
    fontSize: 16,
    alignItems: 'center',
    paddingTop: 4,
    paddingLeft: 20,
  },
  input_f: {
    width: '90%',
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#e5f1f1',
    borderRadius: 5,
    flexDirection: 'row',
  },
  logoPic: {
    width: 230,
    height: 200,
    resizeMode: 'stretch',
    marginBottom:20,
    marginTop:10,
    borderRadius:20

  },
  addButtonL: {
    backgroundColor: '#707070',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  addButtonR: {
    backgroundColor: '#25ced1',
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 20,
  },
  style_flex_button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 1,
    paddingBottom: 10,
    padding: 20,
  },
  addButtonText1: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
    
  },
  priority:{
    flexDirection:'row',
    paddingTop:10

 
  },
  priority_select:{
    paddingLeft:50,
    height:10,
    width:300,
    marginVertical: -7,
    
  },

});

export default AddTaskPage;
