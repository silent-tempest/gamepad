'use strict';

function denormalize ( value, width ) {
  return ( value + 1 ) * 0.5 * width;
}

module.exports = denormalize;
