import {View, Text} from 'react-native';
import React,{useState, useEffect, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from 'react-native-gesture-handler';
import { AuthContext } from '../navigation/AuthProviders';
export default function ArchiveScreen() {
  const [dataTask, setDataTask] = useState([]);
  const {user} = useContext(AuthContext);

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
    <View>
      <FlatList
      data={dataTask}
      renderItem={({item}) => (
          <View>
              <Text>{item.topic}</Text>
              <Text>{item.taskDetail}</Text>
          </View>
      )}
      
      />
    </View>
  );
}
