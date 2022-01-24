import React, {useState} from 'react';
import {useContext, useEffect} from 'react';
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
  ScrollView,
  FlatList
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProviders';
import {StackNavigator} from 'react-navigation';
import themeContext from '../config/themeContext';

const {width} = Dimensions.get('window');

export default function CategoriesTask({route, navigation}) {
  const {name} = route.params;
  const theme = useContext(themeContext);
  const { user } = useContext(AuthContext);
  
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [dataTask, setDataTask] = useState([]);
  const [topic, topicInput] = useState("");
  const [detailTask, detailTaskInput] = useState("");
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [docID, setDocId] = useState("")

  let usersCollectionRef = firestore().collection("user").doc(user.uid).collection(name);

  //Query Task
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

    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);
 
  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    if (topic != "" && detailTask != "") {
      usersCollectionRef
        .add({
          timestamp: firestore.FieldValue.serverTimestamp(),
          topic: topic,
          taskDetail: detailTask,
        })
      topicInput("");
      detailTaskInput("");
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
    <ScrollView>
      <View style={[styles.header, { backgroundColor: theme.hudColor }]}>
        <View style={styles.header_container}>
          {/* <FontAwesome5 name="user-circle" color={'red'} size={24} /> */}
          <View>
            <Text style={styles.textHeader}>{name} TASK</Text>
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
              <Text style={ [styles.taskText, {flex: 1, color: theme.fontColor }]}>{item.topic}</Text>
              <Text>{item.taskDetail}</Text>

              
            </View>

          </View>
        )}
      />
        
        {/**  We are going to create a Modal with Text Input. */}

      </View>

      {/* This is Add Button Bottom */}
      <View>
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={[styles.addButton, { backgroundColor: theme.buttonColor }]} onPress={toggleModalVisibility}>
            <Text style={[styles.addButtonText, { color: theme.fontColor }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/*This is Button Log out*/}

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

            {/** This button is responsible to close the modal */}
            <Button title="Done" onPress={toggleModalVisibility} />
          </View>
        </View>
      </Modal>

    </ScrollView>
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
    backgroundColor: '#25ced1',
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
    shadowColor: "#000000",
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
  selectButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#8ac6d1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  },
});