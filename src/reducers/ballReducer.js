import * as types from '../constants/actionTypes';
import {BALL_RADIUS, WALL_TICKNESS} from '../constants/sizes';
import initialState from './initialState';
import walls from '../data/walls';
import {doesLineCircleIntersect} from '../utils/intersection';

export default function ballReducer(state = initialState.ball, action) {
  switch (action.type) {
    case types.MOVE: {
      const ax = Math.min(action.ax, BALL_RADIUS);
      const ay = Math.min(action.ay, BALL_RADIUS);
      let x = state.x + ax;
      let y = state.y - ay;
      const hitsWall = walls.filter(wall => doesLineCircleIntersect({
        x1: wall[0] - x,
        y1: wall[1] - y,
        x2: wall[2] - x,
        y2: wall[3] - y,
        r: BALL_RADIUS + WALL_TICKNESS/2
      })).length !== 0;
      if(hitsWall) {
        return state;
      }
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
