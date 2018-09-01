'use strict';

/**
 * An object that contains all gamepad parts.
 * @constructor module:gamepad.Gamepad
 * @param {object}         options
 * @param {IGamepadColors} options.colors
 * @example
 * var Gamepad = require( 'gamepad/core/Gamepad' );
 * var RGBA    = require( 'v6.js/colors/RGBA' );
 *
 * var gamepad = new Gamepad( {
 *   colors: {
 *     touchstart: new RGBA( 0, 0.05 ),
 *     touchmove:  new RGBA( 0, 0.075 ),
 *     touchend:   new RGBA( 0, 0.1 )
 *   }
 * } );
 */
function Gamepad ( options ) {
  if ( ! options.colors ) {
    throw Error( 'no `options.colors` specified' );
  }

  this.constants = {
    RADIUS_BIG:   45,
    RADIUS_SMALL: 45 * 0.6
  };

  this.colors = options.colors;
  this.parts  = [];
}

Gamepad.prototype = {
  /**
   * @method module:gamepad.Gamepad#construct
   * @param  {function} constructor
   * @param  {object}   options
   * @return {module:gamepad.IGamepadPart}
   * @example
   * var GamepadStick = require( 'gamepad/core/parts/GamepadStick' );
   * var Vector2D     = require( 'v6.js/math/Vector2D' );
   *
   * var stick = gamepad.construct( GamepadStick, {
   *   position: new Vector2D( 0.5, 0.5 )
   * } );
   */
  construct: function construct ( constructor, options ) {
    return new constructor( {
      options:   options,
      constants: this.constants,
      colors:    this.colors
    } );
  },

  /**
   * @method module:gamepad.Gamepad#add
   * @param  {object} part
   * @return {void}
   * @example
   * gamepad.add( stick );
   */
  add: function add ( part ) {
    this.parts.push( part );
  },

  /**
   * Draws all parts of a gamepad.
   * @method module:gamepad.Gamepad#render
   * @return {void}
   * @example
   * var Ticker = require( 'v6.js/Ticker' );
   *
   * var ticker = new Ticker( function () {
   *   gamepad.render();
   * } ).tick();
   */
  render: function render () {
    var i, l;

    for ( i = 0, l = this.parts.length; i < l; ++i ) {
      this.parts[ i ].render();
    }
  },

  constructor: Gamepad
};

module.exports = Gamepad;
