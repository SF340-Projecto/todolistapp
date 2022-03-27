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
  FlatList
} from 'react-native';
import themeContext from '../config/themeContext';
import styles from '../css/categoriesTask';

const {width} = Dimensions.get('window');

export default function CategoriesTask({route, navigation}) {
  const {categorieData} = route.params;
  const theme = useContext(themeContext);
  console.log(categorieData)
  // This is to manage Modal State
  const [isModalVisible, setModalVisible] = useState(false);
  const [dataTask, setDataTask] = useState([]);
  const [topic, topicInput] = useState("");
  const [detailTask, detailTaskInput] = useState("");


 
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
    <ScrollView>
    <SafeAreaView style={[styles.container, { backgroundColor: theme.backgroundColor }]}>
      <View style={[styles.header, { backgroundColor: theme.hudColor }]}>
        <View style={styles.header_container}>
          {/* <FontAwesome5 name="user-circle" color={'red'} size={24} /> */}
          <View>
            <Text style={styles.textHeader}>{categorieData.name} TASK</Text>
          </View>
        </View>
      </View>
      <View style={styles.body}>
        {/* <StatusBar style="auto" /> */}

        {/**  Displays Task Data */}
        <FlatList
        data={categorieData.task_lists}
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

  </SafeAreaView>
    </ScrollView>
  );
}
