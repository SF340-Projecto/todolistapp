import {API_GET_ARCHIVE_TASK} from '../types';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:4001/archive/';

export const getArchiveTask = user_id => dispatch => {
  axios
    .post(API_URL, {user_id})
    .then(async response => {
      console.log(response.data);
      dispatch({type: API_GET_ARCHIVE_TASK, payload: response.data});
      return response.data;
    })
    .catch(err => {
      alert('Get Failed');
    });
};
