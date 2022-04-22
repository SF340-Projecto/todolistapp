import {
  API_TODO,
  API_TODODELETE,
  API_GETTASK,
  API_ADDTASK,
  API_UPDATETASK,
  API_DELETETASK,
  API_ACHIVETASK,
} from '../types';
import axios from 'axios';

// const API_URL = 'https://app-todolist-api.herokuapp.com/todos';
const API_URL = 'http://10.0.2.2:4001/todos';

export const getTaskList = user_id => dispatch => {
  axios
    .get(API_URL + '/' + user_id)
    .then(response => {
      dispatch({type: API_GETTASK, payload: response.data});

      return response.data;
    })
    .catch(err => {
      alert('Get data error');
    });
};

export const addTaskList =
  (
    user_id,
    date,
    priority,
    taskDetail,
    taskDate,
    taskDatetaskDate,
    timestamp,
    topic,
    urlPhoto,
    noti_id,
  ) =>
  dispatch => {
    console.log(noti_id);
    axios
      .post(API_URL, {
        _id: user_id,
        date,
        priority,
        taskDetail,
        taskDate,
        taskDatetaskDate,
        timestamp,
        topic,
        urlPhoto: urlPhoto,
        noti_id,
      })
      .then(response => {
        //dispatch({type: API_TODOUPDATE, payload: response.data});
        dispatch({type: API_ADDTASK, payload: []});

        return response.data;
      })
      .catch(err => {
        console.log('Add fail');
      });
  };

export const updateTaskList =
  (
    _id,
    date,
    priority,
    taskDetail,
    taskDate,
    taskDatetaskDate,
    timestamp,
    topic,
    urlPhoto,
  ) =>
  dispatch => {
    axios
      .put(API_URL, {
        _id,
        date,
        priority,
        taskDetail,
        taskDate,
        taskDatetaskDate,
        timestamp,
        topic,
        urlPhoto: urlPhoto,
      })
      .then(response => {
        dispatch({type: API_UPDATETASK, payload: []});
        return response.data;
      })
      .catch(err => {
        console.log('Update fail');
        console.log(err);
      });
  };

export const achiveTask = _id => dispatch => {
  axios
    .put(API_URL, {
      _id,
      achive: true,
    })
    .then(response => {
      dispatch({type: API_ACHIVETASK, payload: []});
      return response.data;
    })
    .catch(err => {
      console.log('Update fail');
      console.log(err);
    });
};

export const deleteTask = _id => dispatch => {
  axios
    .delete(API_URL + '/' + _id)
    .then(dispatch({type: API_DELETETASK, payload: []}))
    .catch(err => {
      console.log('Delete fail');
    });
};
