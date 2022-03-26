import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import themeContext from '../config/themeContext';
import AddCatagoriesButton from '../components/AddCatagoriesButton';
import styles from '../css/categoryScreen';
import {useSelector, useDispatch} from 'react-redux';
import {getCategoriesName } from '../redux/actions/categorieAction';

const numColumns = 2
const WIDTH = Dimensions.get('window').width

const Categories = ({ navigation }) => {
  const theme = useContext(themeContext);
  const [dataTask, setDataTask] = useState([]);
  const dispatch = useDispatch();

  const categorieApi = useSelector(state => state.data.categorie);
  const user_id = useSelector(state => state.data.user[0]['_id']);

  // Use for update realtime data
  useEffect(() => {
    dispatch(getCategoriesName(user_id))
},[]);

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
        data={categorieApi}
        renderItem={({item})=>(
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

export default Categories;