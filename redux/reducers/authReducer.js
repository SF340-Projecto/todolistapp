import {
  API_USER,
  API_LOGOUT,
  API_TODO,
  API_TODOUPDATE,
  API_TODODELETE,
  API_CATEGORIE
} from '../types';

const initialState = {
  user: [],
  userLog: false,
  todolist: [],
  categorie: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case API_USER:
      return {
        ...state,
        user: [action.payload],
        userLog: true,
      };
    case API_LOGOUT:
      return {
        ...state,
        user: [],
        userLog: false,
      };
    case API_TODO:
      return {
        ...state,
        todolist: action.payload,
      };
    case API_TODOUPDATE:
      return {
        ...state,
        todolist: [action.payload],
      };
    case API_TODODELETE:
      return {
        ...state,
        todolist: [],
      };
    case API_CATEGORIE:
      return {
        ...state,
        categorie: action.payload
      }

    default:
      return state;
  }
}
