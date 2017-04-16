import React, {PropTypes} from 'react';
import {WALL_TICKNESS} from '../constants/sizes';

const Wall = ({wall, ax, ay}) => {
  let horizontalSide;
  let verticalSide;
  ax = -ax;
  if(wall[1] === wall[3]) { // Horizontal wall
    if(ay > 0) { // Bottom side
      horizontalSide = (
        <polyline className="wallSideHorizontal" points={`
          ${wall[0]-WALL_TICKNESS/2},    ${wall[1]+WALL_TICKNESS/2}
          ${wall[0]-WALL_TICKNESS/2+ax}, ${wall[1]+WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2+ax}, ${wall[3]+WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2},    ${wall[3]+WALL_TICKNESS/2}
        `} />
      );
    }else{ // Top side
      horizontalSide = (
        <polyline className="wallSideHorizontal" points={`
          ${wall[0]-WALL_TICKNESS/2},    ${wall[1]-WALL_TICKNESS/2}
          ${wall[0]-WALL_TICKNESS/2+ax}, ${wall[1]-WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2+ax}, ${wall[3]-WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2},    ${wall[3]-WALL_TICKNESS/2}
        `} />
      );
    }
    if(ax > 0) { // Right side
      verticalSide = (
        <polyline className="wallSideVertical" points={`
          ${wall[2]+WALL_TICKNESS/2},    ${wall[3]-WALL_TICKNESS/2}
          ${wall[2]+WALL_TICKNESS/2+ax}, ${wall[3]-WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2+ax}, ${wall[3]+WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2},    ${wall[3]+WALL_TICKNESS/2}
        `} />
      );
    }else{ // Left side
      verticalSide = (
        <polyline className="wallSideVertical" points={`
          ${wall[0]-WALL_TICKNESS/2},    ${wall[1]-WALL_TICKNESS/2}
          ${wall[0]-WALL_TICKNESS/2+ax}, ${wall[1]-WALL_TICKNESS/2+ay}
          ${wall[0]-WALL_TICKNESS/2+ax}, ${wall[1]+WALL_TICKNESS/2+ay}
          ${wall[0]-WALL_TICKNESS/2},    ${wall[1]+WALL_TICKNESS/2}
        `} />
      );
    }
  }else if(wall[0] === wall[2]){ // Vertical wall
    if(ax > 0) { // Right side
      verticalSide = (
        <polyline className="wallSideVertical" points={`
          ${wall[0]+WALL_TICKNESS/2},    ${wall[1]-WALL_TICKNESS/2}
          ${wall[0]+WALL_TICKNESS/2+ax}, ${wall[1]-WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2+ax}, ${wall[3]+WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2},    ${wall[3]+WALL_TICKNESS/2}
        `} />
      );
    }else{ // Left side
      verticalSide = (
        <polyline className="wallSideVertical" points={`
          ${wall[0]-WALL_TICKNESS/2},    ${wall[1]-WALL_TICKNESS/2}
          ${wall[0]-WALL_TICKNESS/2+ax}, ${wall[1]-WALL_TICKNESS/2+ay}
          ${wall[2]-WALL_TICKNESS/2+ax}, ${wall[3]+WALL_TICKNESS/2+ay}
          ${wall[2]-WALL_TICKNESS/2},    ${wall[3]+WALL_TICKNESS/2}
        `} />
      );
    }
    if(ay > 0) { // Bottom side
      horizontalSide = (
        <polyline className="wallSideHorizontal" points={`
          ${wall[2]-WALL_TICKNESS/2},    ${wall[3]+WALL_TICKNESS/2}
          ${wall[2]-WALL_TICKNESS/2+ax}, ${wall[3]+WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2+ax}, ${wall[3]+WALL_TICKNESS/2+ay}
          ${wall[2]+WALL_TICKNESS/2},    ${wall[3]+WALL_TICKNESS/2}
        `} />
      );
    }else{ // Top side
      horizontalSide = (
        <polyline className="wallSideHorizontal" points={`
          ${wall[0]-WALL_TICKNESS/2},    ${wall[1]-WALL_TICKNESS/2}
          ${wall[0]-WALL_TICKNESS/2+ax}, ${wall[1]-WALL_TICKNESS/2+ay}
          ${wall[0]+WALL_TICKNESS/2+ax}, ${wall[1]-WALL_TICKNESS/2+ay}
          ${wall[0]+WALL_TICKNESS/2},    ${wall[1]-WALL_TICKNESS/2}
        `} />
      );
    }
  }
  return (
    <g>
      {horizontalSide}
      {verticalSide}
    </g>
  );
};

Wall.propTypes = {
  wall: PropTypes.array.isRequired,
  ax: PropTypes.number.isRequired,
  ay: PropTypes.number.isRequired
};

export default Wall;
