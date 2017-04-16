// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import ball from './ballReducer';
 import tilt from './tiltReducer';

 const rootReducer = combineReducers({
   ball,
   tilt
 });

 export default rootReducer;
