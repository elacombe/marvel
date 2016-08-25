import { combineReducers } from 'redux';
import fetch from './fetch';


const rootReducer = () => combineReducers({
  fetch,
});

export default rootReducer;
