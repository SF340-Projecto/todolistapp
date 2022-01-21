import * as React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import TaskPage from '../screens/TaskPage';
import HomeScreen from '../screens/HomeScreen';
import getTaskData from '../firestore/getTaskData';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Task"
        component={TaskPage}
        options={{header: () => null}}
      />
      <Stack.Screen
      name="getTaskData"
      component={getTaskData}
      options={{header: () => null}}
    />
      <Stack.Screen
      name="Home Page"
      component={HomeScreen}
      options={{header: () => null}}
    />
    </Stack.Navigator>

    

  );
}

export default AppStack;