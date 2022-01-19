import * as React from 'react';
import { useContext, useState, useEffect } from 'react';
import { Input } from '../components/Input';
import { AuthContext } from '../navigation/AuthProviders';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { fonts } from 'react-native-elements/dist/config';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { login } = useContext(AuthContext);
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Image
        source={require('./img/LOGO.png')}
        style={styles.logo}
      />

      <View style={styles.bgInput}>
        <Text style={styles.inputText}>USERNAME</Text>
        <Input
          style={styles.input}
          labelValue={email}
          onChangeText={(userEmail) => setEmail(userEmail)}
          placeholder="Email"
          keyboardType={'email-address'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputText}>PASSWORD</Text>
        <Input
          style={styles.input}
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText="Password"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => login(email, password)}>
          <Text style={styles.loginButtonText}>
            LOG IN
          </Text>
        </TouchableOpacity>

      </View>



      <TouchableOpacity>
        <Text style={styles.text} onPress={() => navigation.navigate('RegisterScreen')}>
          DONT'T HAVE ACCOUNT? SIGN UP
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
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
    height: 270,
    width: 310,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'stretch',
    marginBottom: 25,
  },

  title: {
    color: '#00CABA',
    textAlign: 'left',
    fontSize: 35,
    width: 320,
    marginBottom: 1,
    fontWeight: 'bold',
  },
  input: {
    marginVertical: 7,
    width: 260,
    height: 30,
    fontSize: 18,
    marginBottom: 7,
    shadowColor: "#000000",
    shadowOpacity: 5,
    shadowRadius: 5,
    elevation: 5,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,

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
    backgroundColor: '#E2FCFA',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
  },

  text: {
    marginVertical: 25,
    color: '#707070',
    fontSize: 15,
  },
});

export default LoginScreen;