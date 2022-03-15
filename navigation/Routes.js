import React from 'react';
import {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProviders';
import AppStack from './AppStack';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from '../config/themeContext';
import theme from "../config/theme";

//redux stuff
import { useSelector } from 'react-redux'

const Routes = () => {
  const dataApi = useSelector(state => state.data.userLog)

  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };



  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('changeTheme', data => {
        setMode(data);
        console.log(data);
      });
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return () => {
        subscriber
        EventRegister.removeEventListener(eventListener);
    };
  }, []);

  if (initializing) return null;


  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <NavigationContainer>
          {dataApi ? <AppStack /> : <AuthStack />}
        </NavigationContainer>
    </themeContext.Provider>
  );
};

export default Routes;