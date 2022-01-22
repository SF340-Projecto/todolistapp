import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import TaskPage from './TaskPage';
import CategorieScreen from './CategorieScreen';
import ThemeScreen from './ThemeScreen';

const Tab = createBottomTabNavigator();

const MainScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName='Main'
      tabBarOptions={{
        activeTintColor: '#FFFFFF',
        activeBackgroundColor: '#25ced1',
        inactiveBackgroundColor: '#25ced1',
        labelStyle: {
          fontSize: 14,
          paddingBottom: 7,
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