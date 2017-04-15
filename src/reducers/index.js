// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import ball from './ballReducer';

 const rootReducer = combineReducers({
   ball
 });
 
 export default rootReducer;
