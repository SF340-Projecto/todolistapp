/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Provider } from 'react-redux';
import Store from "./redux/store"

import Providers from './navigation'
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();
const App = () => {
  return (
    <Provider store={Store}>
      <Providers/>
    </Provider>
  );
}

export default App;
