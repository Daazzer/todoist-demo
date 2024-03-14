import { combineReducers } from 'redux';
import currentActiveReducer from './currentActiveSlice';
import projectsReducers from './projectsSlice';

const reducer = combineReducers({
  currentActive: currentActiveReducer,
  projects: projectsReducers
});

export default reducer;