import React,{useContext} from 'react';
import styles from '../screens/component.style.js';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
  } from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import themeContext from '../config/themeContext';
function ShowDetail(props) {
  console.log("Data aLLL " ,props) 
  const theme = useContext(themeContext);
  return (
    <View style={styles.bg_modal}>
      <View style={[styles.paper_madal, {backgroundColor: theme.backgroundColor}]}>
        <ScrollView style={styles.showDetailTaskBody}>
          
          <View style={styles.closeDetailContainer}>
            <TouchableOpacity
              onPress={() => {
                props.setModalVisible3(false);
              }}>
              <FontAwesome name="close" color={'white'} size={18} />
            </TouchableOpacity>
          </View> 

          {/* Header Topic */}
          <View style={{flexDirection: 'row', marginVertical: 20}}>
            <View style={styles.headerShowTaskContainer}>
              <Text style={[styles.textShowTask, {color: theme.fontColor}]}>{props.topicFirebase}</Text>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#25ced1',
                paddingHorizontal: 20,
                borderRadius: 10,
                elevation: 10,
              }}>
              <Text style={[{color: theme.fontColor}]}>{props.priority}</Text>
            </View>
          </View>

          {/* Date Time Notification ? */}
          <View style={styles.notiShowTaskContainer}>
            <Text>{props.textDate}</Text>
            <Text>{props.textTime}</Text>
          </View>
          {/* Priority */}

          {/* Task Discription */}
          <View style={styles.taskdetailShowContainer}>
            <Text style={[styles.textdetailShowTask, {color: theme.fontColor}]}>{props.taskDetail}</Text>
          </View>

          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 15,
            }}>
            <Image
              style={{
                width: 200,
                height: 200,
                resizeMode: 'stretch',
                marginBottom: 25,
              }}
              source={{uri: props.urlPhoto}}
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

export default ShowDetail;
