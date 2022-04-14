import {
  API_USER,
  API_LOGOUT,
  API_TODO,
  API_TODOUPDATE,
  API_TODODELETE,
  API_CATEGORIE,
  API_ADDCATEGORIE,
  API_TASK,
  API_EDIT_CATEGORY,
  API_DELETE_CATEGORY,
  API_CHECKTASKINCATE,
  API_ADDTASKCATE,
  API_DELETE_CATEGORYTASK,
  API_UPDATETASKCATEGORY,
  API_ACHIVETASKCATEGORY
} from '../types';

const initialState = {
  user: [],
  userLog: false,
  todolist: [],
  categorie: [],
  taskCategorie: [],
  emptyTask : true,
  addTask : false,
  deleteTask : false,
  updateTask : false,
  achiveTask : false
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
        categorie: action.payload,
      };
    case API_ADDCATEGORIE:
      return {
        ...state,
        categorie: action.payload,
      };
      case API_CHECKTASKINCATE:
        return {
          ...state,
          emptyTask : true,
          addTask : false
        }
    case API_TASK:
      return {
        ...state,
        taskCategorie: action.payload,
        emptyTask : false,
        addTask : false,
        deleteTask : false,
        updateTask : false,
        achiveTask : false
      };

    case API_ADDTASKCATE:
      return{
        ...state,
        taskCategorie: action.payload,
        addTask : true
      }
    case API_DELETE_CATEGORYTASK:
      return{
        ...state,
        deleteTask : true
      }

    case API_UPDATETASKCATEGORY:
      return {
        ...state,
        taskCategorie: action.payload,
        updateTask : true,
      }
    case API_ACHIVETASKCATEGORY:
      return{
        ...state,
        achiveTask : true
      }

    case API_EDIT_CATEGORY:
      return {
        ...state,
        categorie: action.payload,
      };

    case API_DELETE_CATEGORY:
      return {
        ...state,
        categorie: action.payload,
      };

    default:
      return state;
  }
}
