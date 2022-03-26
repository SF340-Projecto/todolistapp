import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';
import styles from '../css/RegisterScreen';

const RegisterScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState('');

  const dispatch = useDispatch();


  const registerUser = async () => {
    console.log(first_name, last_name, email, password)
    dispatch(register(first_name, last_name, email, password))
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>CREATE ACCOUNT</Text>
        <View style={styles.bgInput}>
          <Text style={styles.inputText}>First name</Text>
          <Input
            style={styles.input}
            labelValue={first_name}
            onChangeText={userName => setFirstName(userName)}
            placeholder=""
            autoCorrect={false}
          />
          <Text style={styles.inputText}>Last name</Text>
          <Input
            style={styles.input}
            labelValue={last_name}
            onChangeText={userName => setLastName(userName)}
            placeholder=""
            autoCorrect={false}
          />
          <Text style={styles.inputText}>EMAIL</Text>
          <Input
            style={styles.input}
            labelValue={email}
            onChangeText={userEmail => setEmail(userEmail)}
            placeholder=""
            keyboardType={'email-address'}
            autoCorrect={false}
          />
          <Text style={styles.inputText}>PASSWORD</Text>
          <Input
            style={styles.input}
            labelValue={password}
            onChangeText={userPassword => setPassword(userPassword)}
            placeholderText=""
            secureTextEntry={true}
          />

          <View style={styles.button_wrapper}>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              registerUser(first_name, last_name,email, password);
            }}>
            <Text style={styles.loginButtonText}>CREATE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.loginButtonText}>BACK</Text>
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;
