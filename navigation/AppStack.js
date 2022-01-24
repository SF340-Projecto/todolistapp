import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TaskPage from '../screens/TaskPage';
import ThemeScreen from '../screens/ThemeScreen';
import MainScreen from '../screens/MainScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import AddCatagoriesButton from '../components/AddCatagoriesButton';
import CategoriesTask from '../screens/CategoriesTask';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Task"
        component={TaskPage}
        // options={{
        //   title: 'TODO LIST CATEGORIES',
        //   headerStyle: {
        //     backgroundColor: '#25ced1',
        //     shadowColor: 'white',
        //     elevation: 0,
        //   },
        //   headerTitleStyle: {
        //     color: '#FFFFFF',
        //     fontWeight: 'bold',
        //     fontSize: 22,
        //   },
        //   headerTitleAlign: 'center',
        // }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ThemeScreen"
        component={ThemeScreen}
        // options={{ 
        //     title: 'ThemeScreen',
        //     headerStyle: {
        //       backgroundColor: '#000000',
        //       shadowColor: 'white',
        //       elevation: 0,
        //     },
        //     headerTitleStyle: {
        //       color: '#000000',
        //       fontWeight: 'bold',
        //       fontSize: 22,
        //     },
        //     headerTitleAlign: 'center',
        //   }}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="CatagoriesButton"
        component={AddCatagoriesButton}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="CategoriesTask"
        component={CategoriesTask}
        options={{ header: () => null }}
      />


    </Stack.Navigator>



  );
}

export default AppStack;


