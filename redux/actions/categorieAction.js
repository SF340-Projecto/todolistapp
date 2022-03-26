import {API_CATEGORIE, API_TODODELETE} from '../types';
import axios from 'axios';

const API_URL = 'https://app-todolist-api.herokuapp.com/categories';

export const getCategoriesName = (user_id) => dispatch => {
    console.log(user_id)
  axios
    .get(API_URL + '/' + user_id)
    .then(response => {
      dispatch({type: API_CATEGORIE, payload: response.data});

      return response.data;
    })
    .catch(err => {
      alert('Get data error');
    });
};

export const createCategorie =
   (
    user_id,
    name
  ) =>
  (dispatch) => {
    console.log("Check create cate")
    axios
      .post(API_URL, {
        _id:user_id,
        name: name
      })
      .then(response => {
        console.log(response.data)
        dispatch({type: API_CATEGORIE, payload: []})

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

        return response.data;
      })
      .catch(err => {
        console.log("Update fail")
        console.log(err)
      });
  };

  export const achiveTask = _id => dispatch => {
    axios
      .put(API_URL, {
        _id,
        achive: true
      })
      .then(response => {
        dispatch({type: API_TODODELETE, payload: []})

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
