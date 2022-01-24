import React from 'react';
import { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, Dimensions } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../navigation/AuthProviders';
import { ActivityIndicator, Image, StyleSheet, Modal, TextInput, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import * as Progress from 'react-native-progress';
import storage from '@react-native-firebase/storage';
import themeContext from '../config/themeContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const { width } = Dimensions.get('window');


export default function GetTaskData() {
  const { user } = useContext(AuthContext);
  const theme = useContext(themeContext);

  // Call firebase show data
  let usersCollectionRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('Task');

  //Variable for set date
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [dataTask, setDataTask] = useState([]);
  const [topic, topicInput] = useState("");
  const [detailTask, detailTaskInput] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [docID, setDocId] = useState("");

  // Use for update realtime data
  useEffect(() => {
    const subscriber = usersCollectionRef.onSnapshot(querySnapshot => {
      const dataTask = [];

      querySnapshot.forEach(documentSnapshot => {
        dataTask.push({
          ...documentSnapshot.data(),
          id: documentSnapshot.id
        });
      });

      setDataTask(dataTask);
      setisLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);


  if (isLoading) {
    return <ActivityIndicator />;
  }

  // Function call to open modal
  const toggleModalVisibility = (userDocId) => {
    setModalVisible(!isModalVisible);
    // Set doc id
    setDocId(userDocId)
  };

  // Function call to update task list
  const updateTasklist = () => {
    setModalVisible(!isModalVisible);
    // Call firebase to update
    const userCollection1 = firestore().collection("user").doc(user.uid).collection("Task").doc(docID)
    // set new data
    userCollection1.set({
      timestamp: firestore.FieldValue.serverTimestamp(),
      topic: topic,
      taskDetail: detailTask,
      urlPhoto: urlUser
    })
    // Set data to null
    topicInput("");
    detailTaskInput("");
    setDataTask(dataTask);
    setisLoading(false);
    setDocId("")
  }

  // Delete tasklist function
  const deleteTasklist = (userDocId) => {
    var docRef = firestore().collection("user").doc(user.uid).collection("Task")
    setDocId(userDocId)
    // delete the document
    docRef.doc(docID).delete();
  }


  // Function Call for pick photo in gallary
  const selectImage = () => {
    const options = {
      maxWidth: 2000,
      maxHeight: 2000,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
    launchImageLibrary(options, (response) => { // Use launchImageLibrary to open image gallery
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
        const uploadUri = Platform.OS === 'android' ? uri.replace('file://', '') : uri;
        const placeUrl = user.uid + '/' + 'task' + '/' + filename

        setUploading(true);
        setTransferred(0);
        const task = storage()
          .ref(placeUrl)
          .putFile(uploadUri);
        // set progress state

        task.on('state_changed', snapshot => {
          setTransferred(
            Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
          );
          task.snapshot.ref.getDownloadURL().then((downloadURL) => {
            console.log('File available at', downloadURL);
            urlUser = downloadURL;
            setUrl(urlUser)
            console.log("Checkkkk  ", urlUser)
          });
        });
        setUploading(false);
        Alert.alert(
          'Photo uploaded!',
          'Your photo has been uploaded to Firebase Cloud Storage!'
        );
        setImage(null);
      }
    });
  }

  return (
    <SafeAreaView>
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
              <Text style={ [styles.taskText, {flex: 1, color: theme.fontColor }]}>{item.topic}</Text>
              {/* <Text>{item.taskDetail}</Text>
            <Text>{item.id}</Text> */}



              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonColor }]} onPress={() => { toggleModalVisibility(item.id) }}>
                  {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>E</Text> */}
                  <MaterialIcons name="edit" color={'black'} size={24} />
                </TouchableOpacity>
              
                <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonColor }]} onPress={() => { deleteTasklist(item.id) }}>
                  {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                  <MaterialCommunityIcons name="trash-can" color={'black'} size={24} />
                </TouchableOpacity>
              </View>
              
            </View>
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
                  <Button title="Done" onPress={() => { toggleModalVisibility; updateTasklist(item.id) }} />
                </View>
              </View>
            </Modal>

          </View>
        )}
      />
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
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
  body: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  addButtonContainer: {
    backgroundColor: '#25ced1',
    justifyContent: 'center',
    alignItems: 'center',
    height: 75,

  },
  addButtonText: {
    // color: '#707070',
    fontWeight: 'bold',
    fontSize: 14,

  },
  addButton: {
    // backgroundColor: '#FFFFFF',
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    height: 40,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    margin: 5,
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
    backgroundColor: "#25ced1",
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
    transform: [{ translateX: -(width * 0.4) },
    { translateY: -90 }],
    height: 400,
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 7,
  },
});
