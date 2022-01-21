import React from 'react';
import {useContext, useEffect, useState} from 'react';
import {View, Text, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AuthContext} from '../navigation/AuthProviders';
import { ActivityIndicator, Image, StyleSheet  } from 'react-native';
import { List, ListItem } from "react-native-elements";

export default function GetTaskData() {
  const {user} = useContext(AuthContext);
  console.log(user.uid);

  let usersCollectionRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('Task');

  const testData = [{topic: 'ez', taskDetail: 'ez'},{topic: 'ez', taskDetail: 'ez2'}]
    
  
  
  const [isLoading, setisLoading] = useState(false);
  const [lastData, setLastData] = useState(null);
  const [dataTask, setDataTask] = useState([]);

  useEffect(() => {
    const subscriber = usersCollectionRef.onSnapshot(querySnapshot => {
      const dataTask = [];

      querySnapshot.forEach(documentSnapshot => {
        dataTask.push({
          ...documentSnapshot.data(),
        });
      });

      setDataTask(dataTask);
      setisLoading(false);
    });

    // Unsubscribe from events when no longer in use
    return () => subscriber();
  }, []);

  console.log(dataTask)
  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView>
      <FlatList
      data={dataTask}
      renderItem={({ item }) => (
        <View>
          <Text style={styles.colorText}>{item.topic}</Text>
          <Text>{item.taskDetail}</Text>
          <Image
        style={styles.tinyLogo}
        source={{
          uri: item.urlPhoto,
        }}
      />
        </View>
      )}
    />
    </SafeAreaView>

  );
}
const styles = StyleSheet.create({
  colorText: {
    color: 'black',
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
});