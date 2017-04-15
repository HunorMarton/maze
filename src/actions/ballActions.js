import * as types from '../constants/actionTypes';

export function move(ax, ay) {
  return {
    type: types.MOVE,
    ax,
    ay
  };
}
