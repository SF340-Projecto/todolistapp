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

  let usersCollectionRef = firestore().collection("user").doc(user).collection(name);

 
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
  const cancelAdd = () => {
    setModalVisible(!isModalVisible);
  }

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

        <View style={styles.bg_modal}>
          <View style={styles.paper_madal}>
          <ScrollView >
            <Text style={styles.text_normal}>Topic</Text>
            <View style={{ alignItems: 'center' }}>
              <TextInput
              placeholder="Enter something..."
              value={topic}
              style={styles.input}
              onChangeText={topic => topicInput(topic)}
            />
            </View>
            
            <Text style={styles.text_normal}>Detail Task</Text>
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
           
           <View style={styles.style_flex_button}>
             <TouchableOpacity style={styles.addButtonL} onPress={() => { cancelAdd() }}>
                <Text style={styles.addButtonText1} >CANCLE</Text>
             </TouchableOpacity>

            <TouchableOpacity style={styles.addButtonR} onPress={toggleModalVisibility}>
                <Text style={styles.addButtonText1}>SAVE</Text>
            </TouchableOpacity>

           </View>

            {/** This button is responsible to close the modal */}
            {/* <Button title="Done" onPress={toggleModalVisibility} /> */}
            </ScrollView>
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
  input2: {
    width: '90%',
    borderWidth: 1,
    padding: 20,
    fontSize: 16,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 2,
    backgroundColor: '#e5f1f1',
    borderRadius: 5,
    textAlignVertical: 'top'
  },
  style_flex_button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 200,
    paddingBottom: 10,
    padding: 20
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
    marginBottom: 20,
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
    marginBottom: 20,
  },
  addButtonText1: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
});