import React, {useState} from 'react';
import {useContext, useEffect} from 'react';
import {
  SafeAreaView,
  Modal,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProviders';
import themeContext from '../config/themeContext';
import {ScrollView} from 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AddTaskPage from '../components/AddTaskPage';
import EditTaskPage from '../components/EditTaskPage';
import styles from './component.style.js';
import ShowDetail from '../components/ShowDetail';
import {getTaskList} from '../redux/actions/todoActions';
import {useSelector, useDispatch} from 'react-redux';

export default function TaskPage({navigation}) {
  // This is to manage Modal State

  // Variable modal edit data
  const [isModalVisible1, setModalVisible1] = useState(false);

  // For loop data from firebase
  const [isLoading, setisLoading] = useState(false);
  const [dataTask, setDataTask] = useState(null);

  // This is to manage TextInput State
  const theme = useContext(themeContext);

  // This is user data from firebase
  const {user, logout} = useContext(AuthContext);

  // Variable contain value from user

  const [urlUser, setUrl] = useState('');

  // Variable to manage due date
  const [date, setDate] = useState(new Date());
  const [textDate, setText] = useState('CHOOSE DUE DATE...');
  const [textTime, setTime] = useState('CHOOSE DUE TIME...');

  const [isModalVisible3, setModalVisible3] = useState(false);

  // Show fire base data
  const [topicFirebase, setTopic] = useState();
  const [taskDetail, setTaskDetail] = useState();
  const [urlPhoto, setUrlPhoto] = useState();
  const [priority, setPriority] = useState();

  // get data todolist and user_id
  const dataApi = useSelector(state => state.data.todolist);
  const user_id = useSelector(state => state.data.user[0]['_id']);

  console.log(user_id);

  const dispatch = useDispatch();
  // Use for update realtime data
  useEffect(() => {
    dispatch(getTaskList(user_id));

    setDataTask(dataApi[0]);

    let sortedData = dataApi[0].slice().sort((a, b) => b.priority - a.priority);
    changePriorityToText(sortedData);
    setDataTask(sortedData);
    setisLoading(false);
    createChannels();
    console.log(dataTask)
  }, [dispatch]);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  const changePriorityToText = data => {
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      for (var key in obj) {
        if (key === 'priority') {
          var value = obj[key];
          if (value == '1') {
            obj[key] = 'Low';
          } else if (value == '2') {
            obj[key] = 'Medium';
          } else if (value == '3') {
            obj[key] = 'High';
          }
        }
      }
    }
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
    // Set doc id
  };

  const toggleModalVisibility3 = item => {
    setTopic(item.topic);
    setTaskDetail(item.taskDetail);
    setUrlPhoto(item.urlPhoto);
    setPriority(item.priority);
    setModalVisible3(!isModalVisible3);
  };

  // Delete tasklist function
  async function deleteTasklist(userDocId) {
    const res = await firestore()
      .collection('user')
      .doc(user)
      .collection('Task')
      .doc(userDocId)
      .delete();
  }

  // Open toggle add task and add data to firebase
  async function achiveTask(userDocId, topic, taskDetail) {
    setDocId(userDocId);
    // Check condition and send to firebase
    const achiveCollection = firestore()
      .collection('user')
      .doc(user)
      .collection('Achive');

    achiveCollection.add({
      timestamp: firestore.FieldValue.serverTimestamp(),
      topic: topic,
      taskDetail: taskDetail,
      urlPhoto: urlUser,
      date: date,
      textDate: textDate,
      textTime: textTime,
    });
    deleteTasklist(userDocId);
  }

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView>
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
            data={dataTask}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => toggleModalVisibility3(item)}>
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
                  {/* <Text>{item.taskDetail}</Text>
                  <Text>{item.id}</Text> */}

                  <View style={styles.buttonContainerIcon}>
                    <TouchableOpacity
                      style={[
                        styles.addButtonIcon,
                        {backgroundColor: theme.buttonColor},
                      ]}
                      onPress={() => {
                        toggleModalVisibility1(item.id);
                      }}>
                      {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>E</Text> */}
                      <MaterialIcons name="edit" color={'black'} size={24} />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.addButtonIcon,
                        {backgroundColor: '#f33d3d'},
                      ]}
                      onPress={() => {
                        deleteTasklist(item.id);
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
                        achiveTask(item.id, item.topic, item.taskDetail);
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
                  <EditTaskPage modalEdit={setModalVisible1} item={item.id} />
                </Modal>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* This is Add Button Bottom */}
        <View>
          <AddTaskPage />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
