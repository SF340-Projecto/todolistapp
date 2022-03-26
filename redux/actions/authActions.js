import {API_USER, API_LOGOUT} from '../types';
import axios from 'axios';

const API_URL = 'https://app-todolist-api.herokuapp.com/auths/';

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
   
 }).catch((err)=>{alert("Please check your input")
console.log(err)});
};


export const logout = () =>  (dispatch) => {

  dispatch({ type: API_LOGOUT, payload: []})
   
};


