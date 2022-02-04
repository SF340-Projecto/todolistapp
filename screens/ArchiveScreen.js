import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProviders';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function ArchiveScreen() {
  const [dataTask, setDataTask] = useState([]);
  const { user } = useContext(AuthContext);

  let usersCollectionRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('Achive');

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
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  return (
    <View style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ARCHIVE TASK</Text>
      </View>
      <FlatList
        data={dataTask}
        renderItem={({ item }) => (

          <View style={styles.taskContainer}>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 10, }}>
              <View style={{alignItems: 'center', justifyContent: 'center'}}>
                <FontAwesome name="circle" color={'#707070'} size={13} />
              </View>
              <Text style={styles.taskText}>{item.topic}</Text>

            </View>

            <View style={styles.buttonContainerIcon}>
              <TouchableOpacity style={[styles.addButtonIcon, ]} >
                {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>E</Text> */}
                <FontAwesome name="star" color={'#DEC129'} size={30} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.addButtonIcon]} >
                {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                <MaterialCommunityIcons name="check-circle-outline" color={'#52A336'} size={30} />
              </TouchableOpacity>

              <TouchableOpacity style={[styles.addButtonIcon]} >
                {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                <FontAwesome name="bookmark" color={'#E47434'} size={30} />
              </TouchableOpacity>
            </View>
          </View>
        )}

      />
    </View>
  );
}

const styles = StyleSheet.create({
  addButtonIcon: {
    marginHorizontal: 5,
   
  },
  buttonContainerIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '35%',
  },
  body: {
    flex: 1,
    alignContent: 'flex-start',
    justifyContent: 'flex-start'
  },
  header: {
    height: 75,
    backgroundColor: '#25ced1',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 24,
  },
  taskContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#707070',
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  taskText: {
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 15,
  },
})
