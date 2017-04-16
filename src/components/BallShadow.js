import React, {PropTypes} from 'react';
import {BALL_RADIUS} from '../constants/sizes';

const BallShadow = ({x,y}) => (
  <g>
    <defs>
      <radialGradient id="ballShadowGradient" cx="0.5" cy="0.5" r="0.5" fx="0.5" fy="0.5">
        <stop offset="40%" stopColor="#gray"/>
        <stop offset="100%" stopColor="#D1CFCF"/>
      </radialGradient>
    </defs>
    <circle className="ballShadow" cx={x} cy={y} r={BALL_RADIUS}/>
  </g>
);

BallShadow.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired
};

export default BallShadow;
