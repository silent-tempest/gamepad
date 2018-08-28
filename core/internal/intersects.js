'use strict';

function intersects ( x1, y1, r1, x2, y2 ) {
  return ( x2 - x1 ) * ( x2 - x1 ) + ( y2 - y1 ) * ( y2 - y1 ) < r1 * r1;
}

module.exports = intersects;
