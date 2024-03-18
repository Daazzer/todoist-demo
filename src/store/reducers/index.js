import { combineReducers } from 'redux';
import currentActiveReducer from './currentActiveSlice';
import projectsReducer from './projectsSlice';
import todoListReducer from './todoListSlice';

const reducer = combineReducers({
  currentActive: currentActiveReducer,
  projects: projectsReducer,
  todoList: todoListReducer
});

export default reducer;