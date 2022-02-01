// import React from 'react';
import React, {useState , useContext} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import TaskPage from './TaskPage';
import CategoriesScreen from "./CategoriesScreen";
import ThemeScreen from './ThemeScreen';
import AccountScreen from './AccountScreen'

import themeContext from '../config/themeContext';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const theme = useContext(themeContext);

  return (
    <Tab.Navigator
      initialRouteName='Main'
      tabBarOptions={{
        activeTintColor: theme.fontColor,
        activeBackgroundColor: theme.hudColor,
        inactiveBackgroundColor: theme.hudColor,
        inactiveTintColor: '#ffffff',
        labelStyle: {
          fontSize: 16,
          paddingBottom: 7,
          
          fontWeight: 'bold',
        },
        style: {
          height: 67 + insets.bottom,
          paddingTop: 0.5,
          
        },
      }}
      initialRouteName="Main"
      screenOptions={{
        headerShown: false,
        tabBarStyle:{
          height: 67 + insets.bottom,
          
          
        },
      }}
    >
      <Tab.Screen
        name='Task'
        component={TaskPage}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={30} />
          ),
        }}
      />
      <Tab.Screen
        name='Categories'
        component={CategoriesScreen}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="category" color={color} size={30} />
          ),
        }}
      />
      {/* <Tab.Screen
        name='ThemeScreen'
        component={ThemeScreen}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="theme-light-dark" color={color} size={30} />
          ),
        }}
      /> */}
      <Tab.Screen
        name='AccountScreen'
        component={AccountScreen}
        options={{
          tabBarLabel:() => {return null},
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainScreen;