import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from '../components/Input';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { register } from '../redux/actions/authActions';

const RegisterScreen = () => {
  
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [first_name, setFirstName] = useState();
  const [last_name, setLastName] = useState('');

  const dispatch = useDispatch();


  const registerUser = async (first_name, last_name, email, password) => {
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


          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => {
              registerUser(first_name, last_name,email, password);
            }}>
            <Text style={styles.loginButtonText}>SIGN UP</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  inputText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: 27,
  },
  bgInput: {
    backgroundColor: '#25ced1',
    height: 380,
    width: 310,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    color: '#25ced1',
    textAlign: 'center',
    fontSize: 35,
    width: 320,
    marginBottom: 30,
    fontWeight: 'bold',

  },
  input: {
    marginVertical: 7,
    width: 260,
    fontSize: 16,
    padding: 5,
    marginBottom: 7,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingLeft: 15,
  },
  loginButton: {
    marginVertical: 20,
    backgroundColor: '#fff',
    width: 125,
    height: 40,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },

  loginButtonText: {
    textAlign: 'center',
    color: '#25ced1',
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 6,
  },

  container: {
    flex: 1,
    padding: 50,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  text: {
    color: '#00CABA',
    fontSize: 18,
    textAlign: 'center',
  },
});
export default RegisterScreen;
