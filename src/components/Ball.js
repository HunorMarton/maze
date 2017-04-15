import React, {PropTypes} from 'react';
import * as ball from '../constants/ball';

const Ball = ({x,y}) => (
  <circle className="ball" cx={x} cy={y} r={ball.SIZE}/>
);

Ball.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default Ball;
