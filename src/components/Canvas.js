import React from 'react';
import PropTypes from 'prop-types';
import walls from '../data/walls';
import Ball from './Ball';
import BallShadow from './BallShadow';
import Wall from './Wall';
import WallSide from './WallSide';

const Canvas = ({x, y, ax, ay, move}) => (
    <div id="container">
      <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <BallShadow x={x-ax/2} y={y+ay/2} />
        <g transform={`translate(${ax/2},${-ay/2})`}>
          {walls.map(wall => <WallSide key={wall} wall={wall} ax={ax} ay={ay}/>)}
          {walls.map(wall => <Wall key={wall} wall={wall} />)}
        </g>
        <Ball x={x} y={y} move={move} />
      </svg>
    </div>
);

Canvas.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  ax: PropTypes.number.isRequired,
  ay: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired
};

export default Canvas;
