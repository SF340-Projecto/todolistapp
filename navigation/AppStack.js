import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import TaskPage from '../screens/TaskPage';
import ThemeScreen from '../screens/ThemeScreen';
import MainScreen from '../screens/MainScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import AddCatagoriesButton from '../components/AddCatagoriesButton';
import CategoriesTask from '../screens/CategoriesTask';
import AccountScreen from '../screens/AccountScreen'
import { NavigationContainer } from '@react-navigation/native';
import ArchiveScreen from '../screens/ArchiveScreen';

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Task"
        component={TaskPage}
        options={{ headerShown: false }}
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CatagoriesButton"
        component={AddCatagoriesButton}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategoriesTask"
        component={CategoriesTask}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ArchiveTask"
        component={ArchiveScreen}
        options={{ headerShown: false }}
      />


    </Stack.Navigator>



  );
}

export default AppStack;


