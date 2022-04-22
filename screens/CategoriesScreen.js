import React, {useState, useEffect, useRef,useContext} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Button,
  TextInput,
} from 'react-native';
import AddCatagoriesButton from '../components/AddCatagoriesButton';
import styles from '../css/categoryScreen';
import {useSelector, useDispatch} from 'react-redux';
import {
  DeleteCategory,
  getCategoriesName,
  updateCategory,
} from '../redux/actions/categorieAction';
import ActionSheet from 'react-native-actionsheet';
import Modal from 'react-native-modal';
import themeContext from '../config/themeContext';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import stylesaction from '../screens/component.style.js';
const numColumns = 2;

const Categories = ({navigation}) => {
  const dispatch = useDispatch();
  const [length, setLength] = useState(0);
  const [mode, setMode] = useState(false);
  const [topicInput, setTopicInput] = useState('');

  const [name, setName] = useState('');
  const [id, setId] = useState('');

  let actionsheet = useRef();
  let optionsArr = ['Edit', 'Delete', 'Cancel'];
  const categorieApi = useSelector(state => state.data.categorie);
  const user_id = useSelector(state => state.data.user[0]['_id']);

    // This is to manage TextInput State
    const theme = useContext(themeContext);

  // Use for update realtime data
  useEffect(() => {
    if (length != categorieApi.length) {
      setLength(categorieApi.length);
      dispatch(getCategoriesName(user_id));
    } else if (length == 0) {
      dispatch(getCategoriesName(user_id));
    } 
  });

  const editCategory = () => {
    setTopicInput('');
    setMode(true);
    
  };

  const deleteCategory = () => {
    dispatch(DeleteCategory(id))
  };
  return (
    <SafeAreaView style={[styles.body, {backgroundColor: theme.backgroundColor}]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>CATEGORIES</Text>
      </View>
      {/* block category */} 
      <FlatList
        contentContainerStyle={{flexGrow: 1}}
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
              navigation.navigate('CategoriesTask', {categorieData: item._id})
            }
            onLongPress={() => {
              setName(item.name);
              setId(item._id);
              actionsheet.current.show();
            }}>
            <Text style={styles.categorieText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={{alignItems: 'center'}}>
        <AddCatagoriesButton />
      </View>


      <ActionSheet
      style={{backgroundColor:'red'}}
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




      <Modal
        isVisible={mode}
        onBackdropPress={() => setMode(false)}
        backdropColor="#000"
        backdropOpacity={0.8}
        animationIn="zoomInDown"
        animationOut="zoomOutUp"
        animationInTiming={600}
        animationOutTiming={600}
        backdropTransitionInTiming={600}
        backdropTransitionOutTiming={600}>


        <View style={{flex:1}}>
          <View style={[stylesaction.paper_madal, {backgroundColor: theme.backgroundColor}]}>
            <View style={stylesaction.closeDetailContainer}>
              <TouchableOpacity onPress={() => setMode(false)}>
                <FontAwesome name="close" color={'white'} size={18}  />
              </TouchableOpacity>


            </View>
            <Text style={[stylesaction.text_normal, {color: theme.fontColor}]}>Edit Category Name</Text>
              <View style={{ alignItems: 'center' }}>
                <TextInput
                  placeholder={name}
                  value={topicInput}
                  style={stylesaction.input}
                  onChangeText={topicInput => setTopicInput(topicInput)}
              />
            </View>
            <View style={{paddingBottom:40}}>

            </View>
          <View>
            <View style={{alignItems:'center'}}>
              <TouchableOpacity style={stylesaction.addButtonR} onPress={() => {
                dispatch(updateCategory(id, topicInput));
                setMode(false);
                }}>
                  <Text style={stylesaction.addButtonText_cat}>OK</Text>
                </TouchableOpacity>
            </View>
          </View>
          </View>
          
        </View>
      </Modal>





    </SafeAreaView>
  );
};

export default Categories;
