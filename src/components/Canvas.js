import React from 'react';
import PropTypes from 'prop-types';
import walls from '../data/walls';
import Ball from './Ball';
import Wall from './Wall';

const Canvas = ({x, y, move}) => (
    <div id="container">
      <svg width="500" height="500" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        {walls.map(wall => <Wall key={wall} data={wall} />)}
        <Ball x={x} y={y} move={move} />
      </svg>
    </div>
);

Canvas.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  move: PropTypes.func.isRequired
};

export default Canvas;
