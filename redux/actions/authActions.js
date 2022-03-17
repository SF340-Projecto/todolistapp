import {API_USER, API_LOGOUT} from '../types';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:4001/auths/';

export const login = (email, password) =>  (dispatch) => {

   axios.post(API_URL + 'login', {email, password}).then(response => {

    dispatch({ type: API_USER, payload: response.data})
    
    return response.data;
    
  }).catch((err)=>{alert("Please check your input")});
};

export const register = (first_name, last_name, email, password) =>  (dispatch) => {

  axios.post(API_URL + 'register', {first_name, last_name, email, password}).then(response => {

   dispatch({ type: API_USER, payload: response.data})
   
   return response.data;
   
 }).catch((err)=>{alert("Please check your input")});
};


export const logout = () =>  (dispatch) => {

  dispatch({ type: API_LOGOUT, payload: []})
   
};


