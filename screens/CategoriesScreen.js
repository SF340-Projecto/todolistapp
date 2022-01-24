import {StatusBar} from 'expo-status-bar';
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
  FlatList,
} from 'react-native';
import themeContext from '../config/themeContext';

import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProviders';
import AddCatagoriesButton from '../components/AddCatagoriesButton';

const Categories = ({navigation}) => {
  const theme = useContext(themeContext);
  const [dataTask, setDataTask] = useState([]);
  const {user} = useContext(AuthContext);

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
    <SafeAreaView>
      <Text style={[styles.text, {color: theme.fontColor}]}>
        Categories Screen
      </Text>
      <AddCatagoriesButton />
      <FlatList
        data={dataTask}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate('CategoriesTask', {name: item.name})
            }
            onLongPress={LongPress}
            >
            <Text style={styles.loginButtonText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

// These are user defined styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
  },
  loginButton: {
    marginVertical: 20,
    backgroundColor: '#fff',
    width: 200,
    height: 100,
    borderRadius: 20,
    shadowColor: '#000000',
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  loginButtonText: {
    textAlign: 'center',
    color: '#25ced1',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 6,
    justifyContent: 'center',
  },
});

export default Categories;