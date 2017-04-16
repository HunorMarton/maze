import * as types from '../constants/actionTypes';
import {BALL_RADIUS, WALL_TICKNESS} from '../constants/sizes';
import initialState from './initialState';
import walls from '../data/walls';
import {doesLineSegmentCircleIntersect, modifyCirclePath} from '../utils/intersection';

export default function ballReducer(state = initialState.ball, action) {
  switch (action.type) {
    case types.MOVE: {
      const r = BALL_RADIUS + WALL_TICKNESS/2;
      const ax = Math.max(Math.min(action.ax, r), - r);
      const ay = Math.max(Math.min(action.ay, r), - r);
      let x = state.x + ax;
      let y = state.y - ay;
      walls.filter(wall => doesLineSegmentCircleIntersect({
        x1: wall[0],
        y1: wall[1],
        x2: wall[2],
        y2: wall[3],
        cx: x,
        cy: y,
        r
      })).map(wall => {
        const {cx,cy} = modifyCirclePath({
          x1: wall[0],
          y1: wall[1],
          x2: wall[2],
          y2: wall[3],
          cx: x,
          cy: y,
          r
        });
        x = cx;
        y = cy;
      });
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
