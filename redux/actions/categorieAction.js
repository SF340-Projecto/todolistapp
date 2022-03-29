import {API_ADDCATEGORIE, API_CATEGORIE, API_TODODELETE} from '../types';
import axios from 'axios';

// const API_URL = 'https://app-todolist-api.herokuapp.com/categories';
const API_URL = 'http://10.0.2.2:4001/categories';
const API_URL_TASK = 'http://10.0.2.2:4001/categoryTasks';


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
    axios
      .post(API_URL, {
        _id:user_id,
        name:name,
      })
      .then(response => {
        //dispatch({type: API_TODOUPDATE, payload: response.data});
        dispatch({type: API_ADDCATEGORIE, payload: []})

        return response.data;
      })
      .catch(err => {
        console.log("Add fail")
      });
  };

  export const achiveCategorieTask = _id => dispatch => {
    axios
      .put(API_URL_TASK, {
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


export const getTaskInCategorie = (user_id, _id) => dispatch => {
  console.log(user_id)
axios
  .get(API_URL + '/' + user_id+"/"+_id)
  .then(response => {
    dispatch({type: API_CATEGORIE, payload: response.data});

    return response.data;
  })
  .catch(err => {
    alert('Get data error');
  });
};

export const addTaskCategorie =
   (
    user_id,
    _id,
    date,
    priority,
    taskDetail,
    taskDate,
    taskDatetaskDate,
    timestamp,
    topic,
    urlPhoto,
    achive
  ) =>
  (dispatch) => {
    axios
      .post(API_URL_TASK, {
        user_id : user_id,
        categorie_id : _id,
        date,
        priority,
        taskDetail,
        taskDate,
        taskDatetaskDate,
        timestamp,
        topic,
        urlPhoto:urlPhoto,
        achive: achive
      })
      .then(response => {
        //dispatch({type: API_TODOUPDATE, payload: response.data});
        dispatch({type: API_CATEGORIE, payload: []})

        return response.data;
      })
      .catch(err => {

        console.log(err)
        console.log("Add fail")
      });
  };

  export const updateTaskCategorie =
   (
    user_id,
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
  (dispatch) => {
    axios
      .put(API_URL_TASK, {
        user_id,
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
        //dispatch({type: API_TODOUPDATE, payload: response.data});
        dispatch({type: API_CATEGORIE, payload: []})

        return response.data;
      })
      .catch(err => {

        console.log(err)
        console.log("Add fail")
      });
  };

  export const deleteCategorieTask = _id => dispatch => {
    axios
      .delete(API_URL_TASK + '/' + _id)
      .then( 
        dispatch({type: API_TODODELETE, payload: []})
      )
      .catch(err => {
        console.log("Delete fail")
  
      });
  };