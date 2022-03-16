import {API_TODO, API_TODOADD} from '../types';
import axios from 'axios';

const API_URL = 'http://10.0.2.2:4001/todos';

export const getTaskList = (user_id) => dispatch => {
  axios
    .get(API_URL + '/' + user_id)
    .then(response => {
      dispatch({type: API_TODO, payload: response.data});

      return response.data;
    })
    .catch(err => {
      alert('Get data error');
    });
};

export const addTaskList =
   (
    date,
    priority,
    taskDetail,
    taskDate,
    taskDatetaskDate,
    timestamp,
    topic,
    urlPhoto,
    user_id
  ) =>
  (dispatch) => {
    axios
      .post(API_URL, {
        date,
        priority,
        taskDetail,
        taskDate,
        taskDatetaskDate,
        timestamp,
        topic,
        urlPhoto,
        _id:user_id,
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
      });
  };

export const updateTaskList =
  (
    date,
    priority,
    taskDetail,
    taskDate,
    taskDatetaskDate,
    timestamp,
    topic,
    urlPhoto,
    _id,
  ) =>
  dispatch => {
    axios
      .put(API_URL, {
        date,
        priority,
        taskDetail,
        taskDate,
        taskDatetaskDate,
        timestamp,
        topic,
        urlPhoto,
        _id,
      })
      .then(response => {
        dispatch({type: API_TODOUPDATE, payload: response.data});
        console.log(response.data);

        return response.data;
      })
      .catch(err => {
      });
  };

export const deleteTask = _id => dispatch => {
  axios
    .delete(API_URL + '/' + _id)
    .then( 
      dispatch({type: API_TODODELETE, payload: []})
    )
    .catch(err => {
    });
};
