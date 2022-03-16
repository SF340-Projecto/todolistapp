import {API_TODO, API_TODOADD} from '../types';
import axios from 'axios';
import {useSelector} from 'react-redux';

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
  ) =>
  (dispatch) => {
    const user_id = useSelector(state => state.data.user[0]['_id']);
    console.log(user_id)
    console.log("in redux")

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
        user_id,
      })
      .then(response => {
        console.log(response.data);
        dispatch({type: API_TODOADD, payload: response.data});

        return response.data;
      })
      .catch(err => {
        alert('Please check your input');
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
        alert('Please check your input');
      });
  };

export const deleteTask = _id => dispatch => {
  axios
    .delete(API_URL + '/' + _id)
    .then( 
      dispatch({type: API_TODODELETE, payload: []})
    )
    .catch(err => {
      alert('Please check your input');
    });
};
