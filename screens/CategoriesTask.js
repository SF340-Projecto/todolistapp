import React, {useState} from 'react';
import {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  Modal,
  View,
  TextInput,
  Dimensions,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Image,
} from 'react-native';
import themeContext from '../config/themeContext';
import AddTaskCategorie from '../components/AddTaskCategorie';
import styles from './component.style.js';
import PushNotification from 'react-native-push-notification';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditTaskPage from '../components/EditTaskPage';
import ShowDetail from '../components/ShowDetail';

const {width} = Dimensions.get('window');

export default function CategoriesTask({route, navigation}) {

  const {categorieData} = route.params;
  const theme = useContext(themeContext);
  
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [topic, topicInput] = useState('');
  const [detailTask, detailTaskInput] = useState('');

  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  // Variable to manage due date
  const [textDate, setText] = useState('CHOOSE DUE DATE...');
  const [textTime, setTime] = useState('CHOOSE DUE TIME...');

  // Show fire base data
  const [topicFirebase, setTopic] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const [urlPhoto, setUrlPhoto] = useState();
  const [priority, setPriority] = useState();
  const [length, setLength] = useState(0);
  const [objId, setObjId] = useState();

  const toggleModalVisibility = () => {
    setModalVisible(!isModalVisible);
    if (topic != '' && detailTask != '') {
      usersCollectionRef.add({
        timestamp: firestore.FieldValue.serverTimestamp(),
        topic: topic,
        taskDetail: detailTask,
      });
      topicInput('');
      detailTaskInput('');
    }
  };
  const cancelAdd = () => {
    setModalVisible(!isModalVisible);
  };

  // Notification /////
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  //// Notification close /////

  // Function call to open modal edit
  const toggleModalVisibility1 = userDocId => {
    setModalVisible1(!isModalVisible1);
    setObjId(userDocId);
    console.log("cate id ",objId)
  };

  const toggleModalVisibility3 = item => {
    setTopic(item.topic);
    setTaskDetail(item.taskDetail);
    setUrlPhoto(item.urlPhoto);
    setPriority(item.priority);
    setModalVisible3(!isModalVisible3);
  };

  return (
    <ScrollView>
      <SafeAreaView
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        <View style={[styles.header, {backgroundColor: theme.hudColor}]}>
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
            data={categorieData.task_lists}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => toggleModalVisibility3(item)}>
                {/* check achive or not */}
                {item.achive === false && (
                  <View>
                    <View style={styles.row}>
                      <Image
                        style={styles.tinyLogo}
                        source={{
                          uri: item.urlPhoto,
                        }}
                      />
                      <Text
                        style={[
                          styles.taskText,
                          {flex: 1, color: theme.fontColor},
                        ]}>
                        {item.topic}
                      </Text>
                       <Text>{item.taskDetail}</Text>
                  <Text>{item._id}</Text> 

                      <View style={styles.buttonContainerIcon}>
                        <TouchableOpacity
                          style={[
                            styles.addButtonIcon,
                            {backgroundColor: theme.buttonColor},
                          ]}
                          onPress={() => {
                            toggleModalVisibility1(item._id);
                          }}>
                          {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>E</Text> */}
                          <MaterialIcons
                            name="edit"
                            color={'black'}
                            size={24}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.addButtonIcon,
                            {backgroundColor: '#f33d3d'},
                          ]}
                          onPress={() => {
                            console.log(item._id);

                            dispatch(deleteTask(item._id));
                          }}>
                          {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                          <MaterialCommunityIcons
                            name="trash-can"
                            color={'black'}
                            size={24}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.addButtonIcon,
                            {backgroundColor: '#52a336'},
                          ]}
                          onPress={() => {
                            dispatch(achiveTask(item._id));
                          }}>
                          {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                          <MaterialCommunityIcons
                            name="check-circle-outline"
                            color={'black'}
                            size={24}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    {/*Modal for show detail */}

                    <Modal
                      animationType="slide"
                      transparent
                      visible={isModalVisible3}
                      presentationStyle="overFullScreen"
                      onDismiss={toggleModalVisibility3}>
                      <ShowDetail
                        topicFirebase={topicFirebase}
                        priority={priority}
                        textDate={textDate}
                        textTime={textTime}
                        taskDetail={taskDetail}
                        urlPhoto={urlPhoto}
                        setModalVisible3={setModalVisible3}
                      />
                    </Modal>

                    {/*Modal for edit task */}
                    <Modal
                      animationType="slide"
                      transparent
                      visible={isModalVisible1}
                      presentationStyle="overFullScreen"
                      onDismiss={toggleModalVisibility1}>
                      <EditTaskPage
                        urlPhoto={urlPhoto}
                        modalEdit={setModalVisible1}
                        item={objId}
                        state={true}
                      />
                    </Modal>
                  </View>
                )}
              </TouchableOpacity>
            )}
          />
        </View>

        {/* This is Add Button Bottom */}
        <View>
          <AddTaskCategorie categorie={categorieData._id} />
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
              <ScrollView>
                <Text style={styles.text_normal}>Topic</Text>
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

                <View style={styles.style_flex_button}>
                  <TouchableOpacity
                    style={styles.addButtonL}
                    onPress={() => {
                      cancelAdd();
                    }}>
                    <Text style={styles.addButtonText1}>CANCLE</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.addButtonR}
                    onPress={toggleModalVisibility}>
                    <Text style={styles.addButtonText1}>SAVE</Text>
                  </TouchableOpacity>
                </View>

                {/** This button is responsible to close the modal */}
                {/* <Button title="Done" onPress={toggleModalVisibility} /> */}
              </ScrollView>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ScrollView>
  );
}
