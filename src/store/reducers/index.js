import { combineReducers } from 'redux';
import currentActiveMenuReducer from './currentActiveMenuSlice';
import menusReducer from './menusSlice';
import projectsReducer from './projectsSlice';
import todoListReducer from './todoListSlice';

const reducer = combineReducers({
  currentActiveMenu: currentActiveMenuReducer,
  menus: menusReducer,
  projects: projectsReducer,
  todoList: todoListReducer
});

export default reducer;