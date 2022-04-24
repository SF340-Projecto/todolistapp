import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import styles from '../css/ArchiveScreen';
import themeContext from '../config/themeContext';
import { getArchiveTask } from '../redux/actions/archiveActions';
export default function ArchiveScreen() {
  
  const [dataTask, setDataTask] = useState([]);

  const user_id = useSelector(state => state.data.user[0]['_id']);
  const dataApi = useSelector(state => state.data.todolist);
  const archiveTask = useSelector(state => state.data.archiveTask);
  console.log('DATA Archive: ', archiveTask);

  const dispatch = useDispatch(); 

  useEffect(() => {
    dispatch(getArchiveTask(user_id))
  }, [])
  
  const theme = useContext(themeContext);

  return (
    <View style={[styles.body, {backgroundColor: theme.hudColor1_body}]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>ARCHIVE TASK</Text>
      </View>
      <FlatList
        data={archiveTask}
        renderItem={({ item }) => ( 
          <View style={[styles.taskContainer, {backgroundColor: theme.hudColor1}]}>
            {/* check achive or not */}
            {item.achive === true && (
                  <View>
                <View style={{ flexDirection: 'row',}}>
                    <FontAwesome name="circle" style={[styles.buttoncircle, {color: theme.fontColor}]} />
                    <Text style={[styles.taskText, {color: theme.fontColor}]}>{item.topic}</Text>
                    
                    <View style={styles.buttonContainerIcon}>
                      <TouchableOpacity style={[styles.addButtonIcon]} >
                        {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>E</Text> */}
                        <FontAwesome name="star" color={'#DEC129'} size={25} />
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.addButtonIcon]} >
                        {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                        <MaterialCommunityIcons name="check-circle-outline" color={'#52A336'} size={25} />
                      </TouchableOpacity>

                      <TouchableOpacity style={[styles.addButtonIcon]} >
                        {/* <Text style={[styles.addButtonText, { color: theme.fontColor }]}>D</Text> */}
                        <FontAwesome name="bookmark" color={'#E47434'} size={25} />
                    </TouchableOpacity> 
                </View>
                </View>
                <View style={[styles.contentline]}>
                  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
              </View>

                
                </View>
                
          )}
          </View>
        )}

      />
    </View>
  );
}
