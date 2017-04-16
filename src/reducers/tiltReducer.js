import * as types from '../constants/actionTypes';
import initialState from './initialState';
import {BALL_RADIUS, WALL_TICKNESS} from '../constants/sizes';

export default function tiltReducer(state = initialState.tilt, action) {
  switch (action.type) {
    case types.MOVE: {
      const r = BALL_RADIUS + WALL_TICKNESS/2;
      const ax = Math.max(Math.min(action.ax, r*2), - r*2);
      const ay = Math.max(Math.min(action.ay, r*2), - r*2);
      return Object.assign({}, state, {
        ax,
        ay,
      });
      }
    default:
      return state;
    }
}
