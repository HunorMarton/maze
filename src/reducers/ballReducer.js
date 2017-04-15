import * as types from '../constants/actionTypes';
import * as ball from '../constants/ball';
import initialState from './initialState';
import walls from '../data/walls';

export default function ballReducer(state = initialState.ball, action) {
  switch (action.type) {
    case types.MOVE: {
      let x = state.x + action.ax;
      let y = state.y - action.ay;
      x = Math.min(x,200);
      y = Math.min(y,200);
      x = Math.max(0, x);
      y = Math.max(0, y);
      return Object.assign({}, state, {
        x,
        y
      });
      }
    default:
      return state;
    }
}
