import React, {useState, useContext} from 'react';
import {Text, View, Button, Switch, StyleSheet, TouchableOpacity} from 'react-native';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '../config/themeContext';

export default function HomeScreen({navigation}) {
  const theme = useContext(themeContext);
  const [mode, setMode] = useState(false);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <Text style={[styles.text, {color: theme.fontColor}]}>
        Welcome to ThemeScreen
      </Text>
      <Switch
        value={mode}
        onValueChange={value => {
          setMode(value);
          EventRegister.emit('changeTheme', value);
        }}
      />
      <TouchableOpacity 
      onPress={()=> navigation.navigate('Main')} 
      style={{marginTop: 20, borderRadius: 15, backgroundColor: '#25ced1', padding: 20,}}
      testID='backButton'>
          <Text>Back to Main</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 20,
    paddingBottom: 20,
  },

  button: {
    paddingTop: 20,
  },
});
