import { combineReducers } from 'redux';
import currentActiveReducer from './currentActiveSlice';

const reducer = combineReducers({
  currentActive: currentActiveReducer
});

export default reducer;