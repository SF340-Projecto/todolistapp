import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { useContext, useEffect } from 'react';
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
  FlatList,
  Image
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProviders';
import { launchImageLibrary } from 'react-native-image-picker'; // Migration from 2.x.x to 3.x.x => showImagePicker API is removed.
import storage from '@react-native-firebase/storage';
import * as Progress from 'react-native-progress';
import themeContext from '../config/themeContext';
import { ScrollView } from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import DateTimePicker from '@react-native-community/datetimepicker';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

export default function TaskPage({ navigation }) {
  // This is to manage Modal State
  // Variable to modal add data
  const [isModalVisible, setModalVisible] = useState(false);

  // Variable modal edit data
  const [isModalVisible1, setModalVisible1] = useState(false);


  const [isModalVisible2, setModalVisible2] = useState(false);


  // For loop data from firebase
  const [isLoading, setisLoading] = useState(false);
  const [dataTask, setDataTask] = useState([]);

  // This is to manage TextInput State
  const theme = useContext(themeContext);
  const [topic, topicInput] = useState('');
  const [detailTask, detailTaskInput] = useState('');

  // This is user data from firebase
  const { user, logout } = useContext(AuthContext);

  // Variable contain value from user
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [docID, setDocId] = useState('');
  const [urlUser, setUrl] = useState('');

  // Variable to manage due date
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  // Call firebase show data
  let usersCollectionRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('Task');

  // Use for update realtime data
  useEffect(() => {
    const subscriber = usersCollectionRef.onSnapshot(querySnapshot => {
      const dataTask = [];

      querySnapshot.forEach(documentSnapshot => {
        dataTask.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id,
        });
      });

      setDataTask(dataTask);
      setisLoading(false);
      createChannels();
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  // Notification /////
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  //// Notification close /////


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
      console.log('Response = ', response.assets[0].uri);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };

        const uri = response.assets[0].uri;
        const filename = uri.substring(uri.lastIndexOf('/') + 1);
        const uploadUri =
          Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        const placeUrl = user.uid + '/' + 'task' + '/' + filename;
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
            console.log('File available at', downloadURL);
            setUrl(downloadURL);
            console.log('Checkkkk  ', downloadURL);
          });
        });
        setUploading(false);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded',
        );
        setImage(null);
        setUrl("");
      }
    });
  };

  // Function call to update task list
  const updateTasklist = () => {
    setModalVisible1(!isModalVisible1);
    // Call firebase to update
    const userCollection1 = firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Task')
      .doc(docID);
    // set new data
    userCollection1.set({
      timestamp: firestore.FieldValue.serverTimestamp(),
      topic: topic,
      taskDetail: detailTask,
      urlPhoto: urlUser,
    });
    // Set data to null
    topicInput('');
    detailTaskInput('');
    setDataTask(dataTask);
    setisLoading(false);
    setDocId('');
  };

  // Function call to open modal edit 
  const toggleModalVisibility1 = userDocId => {
    setModalVisible1(!isModalVisible1);
    // Set doc id
    setDocId(userDocId)
  };

  // Delete tasklist function
  const deleteTasklist = (userDocId) => {
    var docRef = firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Task');
    setDocId(userDocId);
    // delete the document
    docRef.doc(docID).delete();
  };

  // Open toggle add task and add data to firebase
  const toggleModalVisibility = userDocId => {
    setModalVisible(!isModalVisible);
    setDocId(userDocId);

    // Check condition and send to firebase
    if (topic != '' && detailTask != '') {
      usersCollectionRef.add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        topic: topic,
        taskDetail: detailTask,
        urlPhoto: urlUser,
      });

      topicInput('');
      detailTaskInput('');
      // PushNotification.cancelAllLocalNotifications();

      // PushNotification.localNotification({
      //     channelId: "test-channel",
      //     title: date + topic,
      //     message: new Date(Date.now()).toString(),
      //     smallIcon: "ic_notification",
      // });

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


  // Open toggle add task and add data to firebase
  const achiveTask = (userDocId, topic, taskDetail) => {
    setDocId(userDocId);
    console.log("INNNNNNNN")
    // Check condition and send to firebase
    const achiveCollection = firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Achive')

    achiveCollection.add({
      timestamp: firestore.FieldValue.serverTimestamp(),
      topic: topic,
      taskDetail: taskDetail,
      urlPhoto: urlUser,
    });

    var docRef = firestore()
      .collection('user')
      .doc(user.uid)
      .collection('Task');
    // delete the document
    docRef.doc(docID).delete();

  };



  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <ScrollView>
        <View style={[styles.header, { backgroundColor: theme.hudColor }]}>
          <View style={styles.header_container}>
            {/* <FontAwesome5 name="user-circle" color={'red'} size={24} /> */}
            <View>
              <Text style={styles.textHeader}>TODO LIST TASK</Text>
            </View>
          </View>
        </View>
        <View style={styles.body}>
          {/* <StatusBar style="auto" /> */}

          {/**  Displays Task Data */}

          <FlatList
            data={dataTask}
            renderItem={({ item }) => (

              <View>
                <View style={styles.row}>
                  <Image
                    style={styles.tinyLogo}
                    source={{
                      uri: item.urlPhoto,
                    }}
                  />
                  <Text style={[styles.taskText, { flex: 1, color: theme.fontColor }]}>{item.topic}</Text>
                  {/* <Text>{item.taskDetail}</Text>
                  <Text>{item.id}</Text> */ }



                  <View style={styles.buttonContainerIcon}>
                    <TouchableOpacity style={[styles.addButtonIcon, { backgroundColor: theme.buttonColor }]} onPress={() => { toggleModalVisibility1(item.id) }}>
                      {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>E</Text> */}
                      <MaterialIcons name="edit" color={'black'} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.addButtonIcon, { backgroundColor: theme.buttonColor }]} onPress={() => { deleteTasklist(item.id) }}>
                      {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                      <MaterialCommunityIcons name="trash-can" color={'black'} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.addButtonIcon, { backgroundColor: theme.buttonColor }]} onPress={() => { achiveTask(item.id, item.topic, item.taskDetail) }}>
                      {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                      <Text> Achive task </Text>
                    </TouchableOpacity>
                  </View>

                </View>

                {/*Modal for edit task */}
                <Modal
                  animationType="slide"
                  transparent
                  visible={isModalVisible1}
                  presentationStyle="overFullScreen"
                  onDismiss={toggleModalVisibility1}>
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

                      <View>
                        <Text style={styles.pickedDate}>{date.toString()}</Text>
                        <View>
                          <Button onPress={showDatepicker} title="Show date picker!" />
                        </View>
                        <View>
                          <Button onPress={showTimepicker} title="Show time picker!" />
                        </View>
                        {show && (
                          <DateTimePicker
                            testID="dateTimePicker"
                            value={new Date()}
                            mode={mode}
                            minimumDate={Date.parse(new Date())}
                            is24Hour={true}
                            display="default"
                            onChange={onChange}
                          />
                        )}
                      </View>

                      <TouchableOpacity style={styles.selectButton} onPress={selectImage}>
                        <Text style={styles.buttonText}>Pick an image</Text>
                      </TouchableOpacity>
                      <View style={styles.imageContainer}>
                        {image !== null ? (
                          <Image source={{ uri: image.uri }} style={styles.imageBox} />
                        ) : null}
                        {uploading ? (
                          <View style={styles.progressBarContainer}>
                            <Progress.Bar progress={transferred} width={300} />
                          </View>
                        ) : null
                        }
                      </View>

                      {/** This button is responsible to close the modal */}
                      <Button title="Done" onPress={() => { toggleModalVisibility1; updateTasklist(item.id) }} />
                    </View>
                  </View>
                </Modal>

              </View>
            )}
          />
          {/**  We are going to create a Modal with Text Input. */}

          {/* <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate('EditTask')}>
        <Text style={styles.loginButtonText}>GetData</Text>
      </TouchableOpacity> */}
          {/* <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate('ThemeScreen')}>
        <Text style={[styles.loginButtonText, {color: theme.color}]}>ThemeScreen</Text>
      </TouchableOpacity> */}
        </View>

        {/* This is Add Button Bottom */}
        <View>
          <View style={styles.addButtonContainer}>
            <TouchableOpacity
              style={[styles.addButton, { backgroundColor: theme.buttonColor }]}
              onPress={toggleModalVisibility}>
              <Text style={[styles.addButtonText, { color: theme.fontColor }]}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/*This is Button Log out*/}
        <View>
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={() => logout()}>
              <Text style={[styles.logoutText, { color: theme.fontColor }]}>
                LOG OUT
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

              <View>
                <Text style={styles.pickedDate}>{date.toString()}</Text>
                <View>
                  <Button onPress={showDatepicker} title="Show date picker!" />
                </View>
                <View>
                  <Button onPress={showTimepicker} title="Show time picker!" />
                </View>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={mode}
                    minimumDate={Date.parse(new Date())}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
              <TouchableOpacity
                style={styles.selectButton}
                onPress={selectImage}>
                <Text style={styles.buttonText}>Pick an image</Text>
              </TouchableOpacity>
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

              {/** This button is responsible to close the modal */}
              <Button title="Done" onPress={toggleModalVisibility} />
            </View>
          </View>
        </Modal>


      </ScrollView>
    </SafeAreaView>
  );
}

// These are user defined styles
const styles = StyleSheet.create({
  addButtonIcon: {
    marginHorizontal: 7,
    padding: 5,
    borderRadius: 10,
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
    borderWidth: 0.5,
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
    width: 66,
    height: 58,
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
    transform: [{ translateX: -(width * 0.4) }, { translateY: -90 }],
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
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center',
  },
  progressBarContainer: {
    marginTop: 20,
  },
  imageBox: {
    width: 300,
    height: 300,
  },
});
