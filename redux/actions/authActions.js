import {API_USER, API_LOGOUT} from '../types';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_URL = 'https://app-todolist-api.herokuapp.com/auths/';
const API_URL = 'http://10.0.2.2:4001/auths/';

export const login = (email, password) => dispatch => {
  axios
    .post(API_URL + 'login', {email, password})
    .then(async response => {
      dispatch({type: API_USER, payload: response.data});
      const token = response.data.token;
      try {
        await AsyncStorage.setItem('token', token);
      } catch (error) {
        console.log(error);
      }
      return response.data;
    })
    .catch(err => {
    });
};

export const register =
  (first_name, last_name, email, password) => dispatch => {
    axios
      .post(API_URL + 'register', {first_name, last_name, email, password})
      .then(response => {
        dispatch({type: API_USER, payload: response.data});

        return response.data;
      })
      .catch(err => {
        console.log(err);
      });
  };

export const logout = () => async dispatch => {
  try {
    await AsyncStorage.removeItem('token');
  } catch (error) {
    console.log(error);
  }
  dispatch({type: API_LOGOUT, payload: []});
};

export const getUser = user_id => dispatch => {
  axios
    .get(API_URL + user_id)
    .then(response => {
      dispatch({type: API_USER, payload: response.data});
      return response.data;
    })
    .catch(err => {
      console.log(err);
    });
};
