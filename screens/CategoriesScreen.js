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
} from 'react-native';
import themeContext from '../config/themeContext';

import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../navigation/AuthProviders';
import AddCatagoriesButton from '../components/AddCatagoriesButton';

const Categories = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [dataTask, setDataTask] = useState([]);
  const { user } = useContext(AuthContext);

  let CategoriesRef = firestore()
    .collection('user')
    .doc(user.uid)
    .collection('NameCategories')
    .orderBy('timestamp', 'desc');

  useEffect(() => {
    const subscriber = CategoriesRef.onSnapshot(querySnapshot => {
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

  const LongPress = () => {
    alert('LongPress')
  }

  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATEGORIES</Text>
      </View>
      <AddCatagoriesButton />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}
        numColumns={2}
        key={'#'}
        horizontal={false}
        keyExtractor={(item,index)=>index.toString()}
        data={dataTask}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.categorieContainer}
            onPress={() =>
              navigation.navigate('CategoriesTask', { name: item.name })
            }
            onLongPress={LongPress}
          >
            <Text style={styles.categorieText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

// These are user defined styles
const styles = StyleSheet.create({
  body: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
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
  categorieContainer: {
    elevation: 5,
    padding: 10,
    backgroundColor: '#FFFFFF',
    width: 150,
    height: 130,
    margin: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 10,
    borderColor: '#25ced1'
  },
  categorieText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'orange'
  },  
});

export default Categories;