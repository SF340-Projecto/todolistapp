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

const numColumns = 2
const WIDTH = Dimensions.get('window').width

const Categories = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [dataTask, setDataTask] = useState([]);
  const { user } = useContext(AuthContext);

  let CategoriesRef = firestore()
    .collection('user')
    .doc(user)
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

  const formatData = (dataTask, numColumns) => {
    const totalRows = Math.floor(dataTask.length / numColumns)
    let totalLastRow = dataTask.length - (totalRows * numColumns)

    while (totalLastRow !== numColumns && totalLastRow !== 0) {
      dataTask.push({ id: 'blank', empty: true })
      totalLastRow++
    }
    return dataTask

  }

  const LongPress = () => {
    alert('LongPress')
  }

  const renderItem = ({item, index}) => {
    if (item.empty == true) {
      return <View style={[styles.categorieContainer, styles.itemInvisible]}></View>
    }
    return (
      <TouchableOpacity
            style={styles.categorieContainer}
            onPress={() =>
              navigation.navigate('CategoriesTask', { name: item.name })
            }
            onLongPress={LongPress}
          >
            <Text style={styles.categorieText}>{item.name}</Text>
          </TouchableOpacity>
    )
  }



  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATEGORIES</Text>
      </View>
      <AddCatagoriesButton />
      <FlatList
        contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
        columnWrapperStyle={styles.row}
        numColumns={numColumns}
        key={'#'}
        horizontal={false}
        keyExtractor={(item, index) => index.toString()}
        data={formatData(dataTask, numColumns)}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

// These are user defined styles
const styles = StyleSheet.create({
  itemInvisible: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    elevation: 0,
  },  
  row: {

    justifyContent: 'space-around'
  },
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