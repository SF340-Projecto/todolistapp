import {API_TODO, API_TODODELETE} from '../types';
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
    user_id,
    date,
    priority,
    taskDetail,
    taskDate,
    taskDatetaskDate,
    timestamp,
    topic,
    urlPhoto,
  ) =>
  (dispatch) => {
    axios
      .post(API_URL, {
        _id:user_id,
        date,
        priority,
        taskDetail,
        taskDate,
        taskDatetaskDate,
        timestamp,
        topic,
        urlPhoto:urlPhoto,
      })
      .then(response => {
        //dispatch({type: API_TODOUPDATE, payload: response.data});
        dispatch({type: API_TODODELETE, payload: []})

        return response.data;
      })
      .catch(err => {
        console.log("Add fail")
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
    console.log(    _id,
      date,
      priority,
      taskDetail,
      taskDate,
      taskDatetaskDate,
      timestamp,
      topic,
      urlPhoto)
    
      console.log(urlPhoto)
      
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
        urlPhoto:urlPhoto,
      })
      .then(response => {
        dispatch({type: API_TODODELETE, payload: []})
        console.log(response.data);

        return response.data;
      })
      .catch(err => {
        console.log("Update fail")
        console.log(err)
      });
  };

export const deleteTask = _id => dispatch => {
  axios
    .delete(API_URL + '/' + _id)
    .then( 
      dispatch({type: API_TODODELETE, payload: []})
    )
    .catch(err => {
      console.log("Delete fail")

    });
};
