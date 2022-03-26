import * as React from 'react';
import { useState } from 'react';
import { Input } from '../components/Input';
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { login } from '../redux/actions/authActions';
import styles from '../css/LoginScreen';

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const SignIn = async (email, password) => {
    dispatch(login(email, password))
  }

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
          placeholder=""
          keyboardType={'email-address'}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.inputText}>PASSWORD</Text>
        <Input
          style={styles.input}
          labelValue={password}
          onChangeText={(userPassword) => setPassword(userPassword)}
          placeholderText=""
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.loginButton} onPress={() => SignIn(email, password)}>
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


export default LoginScreen;