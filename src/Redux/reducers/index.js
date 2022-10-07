// index.js que servirá para combinar os reducers
import { combineReducers } from 'redux';
import player from './login';

const rootReducer = combineReducers({
  player,
});

export default rootReducer;
