import React, {useState, useEffect, useRef} from 'react';
import {useContext} from 'react';
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
import {getCategoriesName} from '../redux/actions/categorieAction';
import ActionSheet from 'react-native-actionsheet';

const numColumns = 2;
const WIDTH = Dimensions.get('window').width;

const Categories = ({navigation}) => {
  const theme = useContext(themeContext);
  const [dataTask, setDataTask] = useState([]);
  const dispatch = useDispatch();
  const [length, setLength] = useState(0);

  let actionsheet = useRef();
  let optionsArr = ['Edit', 'Delete', 'Cancel'];
  const categorieApi = useSelector(state => state.data.categorie);
  const user_id = useSelector(state => state.data.user[0]['_id']);

  // Use for update realtime data
  useEffect(() => {

    if (length != categorieApi.length) {
      console.log('dif');
      console.log(length, categorieApi.length);
      setLength(categorieApi.length);
      dispatch(getCategoriesName(user_id));
    } else if (length == 0) {
      dispatch(getCategoriesName(user_id));
      console.log(length, categorieApi.length);
      console.log('not dif');
    } else {
      console.log('else');
      console.log(length, categorieApi.length);
    }
    
});

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
    actionsheet.current.show();
  };

  const editCategory = () => {
    alert('Edit')
  }

  const deleteCategory = () => {
    alert('Delete')
  }
  return (
    <SafeAreaView style={styles.body}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATEGORIES</Text>
      </View>

      {/* block category */}
      <FlatList
        contentContainerStyle={{flexGrow: 1, }}
        columnWrapperStyle={styles.row}
        numColumns={numColumns}
        key={'#'}
        horizontal={false}
        keyExtractor={(item, index) => index.toString()}
        data={categorieApi}
        renderItem={({item}) => (
          <TouchableOpacity
          style={styles.categorieContainer} 
          onPress={() =>
            navigation.navigate('CategoriesTask', { categorieData: item._id })
          }
          onLongPress={LongPress}
        >
          <Text style={styles.categorieText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{alignItems:'center'}}>
        <AddCatagoriesButton />
      </View>
      
      <ActionSheet
        ref={actionsheet}
        title={'Which one do you want to do ?'}
        options={optionsArr}
        cancelButtonIndex={2}
        destructiveButtonIndex={1}
        onPress={index => {
          switch (optionsArr[index]) {
            case 'Edit':
              editCategory();
              break;
            case 'Delete':
              deleteCategory();
                break;
            default:
              break;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default Categories;
