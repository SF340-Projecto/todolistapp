import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Agenda } from 'react-native-calendars';
import { Card, Avatar } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';


const CalendarScreen = (props) => {

  const dataApi = useSelector(state => state.data.todolist);
  var firstTaskDate = ''

  // Function That Split Value of Date
  const allDate = []
  for (var i = 0; i < dataApi.length; i++) {
    allDate.push(dateConvert(dataApi[i].taskDate.split("/")))
    if (i == 0){
      firstTaskDate = dateConvert(dataApi[i].taskDate.split("/"))
    }
    
  }
  
  function dateConvert(firstDateSplit){
    var dateCon = ""
    for (var i = 2; i >= 0; i--) {
      if (i <= 1) {
        if (firstDateSplit[i].length == 1) {
          dateCon += "-" + "0" + firstDateSplit[i];
        } else {
          dateCon += "-" + firstDateSplit[i];
        }
      } else {
        dateCon += firstDateSplit[i];
      }
    }
    return dateCon;
  }

  const counts = {};
  allDate.forEach((x) => {
    counts[x] = (counts[x] || 0) + 1;
  });

  const [items, setItems] = useState({});

  const timeToString = (time) => {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  };

  const loadItems = async (day) => {
    setTimeout(() => {
      for (const key in counts) { //{ '2022-04-05': 3, '2022-04-06': 1, '2022-04-07': 1,'2022-04-10': 1 }
        for (let i = -15; i < 85; i++) {
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          const strTime = timeToString(time); 
          
          if (!items[strTime]) {
            items[strTime] = []; // store a task in that day
            // const numItems = Math.floor(Math.random() * 3);;
            const emptyDate = 0            
            if (allDate.includes(strTime)) {
              
              for (let j = 0; j < counts[key]; j++) {
                  var nameTask = '';
                  var description = '';
                  for (var d in dataApi){
                    if (dateConvert(dataApi[d].taskDate.split("/")) == strTime) {
                      nameTask = dataApi[d].topic
                      description = dataApi[d].taskDetail
                      timeStamp = dataApi[d].timestamp
                      
                      items[strTime].push({
                      name: nameTask,
                      des: description,
                      time: timeStamp,
                      height: Math.max(50, Math.floor(Math.random() * 150))
                    });
                    }
                  }
                  break

                  
              } break
          } 
            else {
            for (let j = 0; j < emptyDate; j++) {
              items[strTime].push({
                name: '#' + dataApi[0].taskDate,
                height: Math.max(50, Math.floor(Math.random() * 150)),

              });
            }
          }
          }

        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  const renderItem = (item) => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 20, borderColor: '#000' }} onPress={console.log("kuy")}>
        <Card>
          <Card.Content>
            <View style={{flexDirection: 'row'}}>
              <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
                flex: 1,
                }}>
                <Text style={styles.color_time_text}>{item.time}</Text>
                <Text style={styles.color_name_task}>{item.name}</Text>
                <Text style={styles.color_taskDetail}>{item.des}</Text>
              </View>
              <Avatar.Text label="M" size={64} backgroundColor="#25CED1" style={{marginLeft: 20, marginTop: 15, marginRight: 15}} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  };

  const renderEmptyDate = () => {
    return (
      <TouchableOpacity style={{ marginRight: 10, marginTop: 17, }}>
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text> </Text>
              <Avatar.Text label="M" size={64} backgroundColor="white" style={{marginLeft: 20, marginTop: 15, marginRight: 15}} />
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        items={items}
        loadItemsForMonth={loadItems}
        selected={firstTaskDate}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
      />
    </View>
  )
}

export default CalendarScreen;

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'red',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  },
  color_time_text: {
    color: '#000',
    marginBottom: 5,
    fontSize: 14,
  },
  color_name_task: {
    color: '#000',
    fontSize: 20,
    marginVertical: 5,
  },
  color_taskDetail: {
    color: '#808080'
  }
});

// const Calendar = (props) => {

//   console.log(props.data)

//   return(
//     <View>
//       <Text>{props.data}</Text>
//     </View>
//   )
// }

// export default Calendar