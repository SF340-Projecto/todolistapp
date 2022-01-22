// import React from 'react';
import React, {useState , useContext} from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TaskPage from './TaskPage';
import CategorieScreen from './CategorieScreen';
import ThemeScreen from './ThemeScreen';

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
        labelStyle: {
          fontSize: 14,
          paddingBottom: 7,
          color: theme.fontColor,
        },
        style: {
          height: 67 + insets.bottom,
          paddingTop: 0.5,
        },
      }}
    >
      <Tab.Screen
        name='Task'
        component={TaskPage}
        options={{
          tabBarLabel: 'Task',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='Categorie'
        component={CategorieScreen}
        options={{
          tabBarLabel: 'Categorie',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='ThemeScreen'
        component={ThemeScreen}
        options={{
          tabBarLabel: 'Theme',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  )
};

export default MainScreen;