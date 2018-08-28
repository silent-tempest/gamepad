'use strict';

var extend              = require( 'super-extend' );
var Vector2D            = require( 'v6.js/math/Vector2D' );
var IGamepadDefaultPart = require( './IGamepadDefaultPart' );

var GamepadStick = extend( IGamepadDefaultPart, {
  /**
   * @constructor module:gamepad.GamepadStick
   * @extends {module:gamepad.IGamepadDefaultPart}
   * @example
   * var GamepadStick = require( 'gamepad/core/parts/GamepadStick' );
   *
   * var stick = new GamepadStick( {
   *   colors: {
   *     touchstart: 'rgba( 0, 0, 0, 0.05 )',
   *     touchend:   'rgba( 0, 0, 0, 0.075 )',
   *     touchend:   'rgba( 0, 0, 0, 0.1 )'
   *   },
   *
   *   options: {
   *     position: {
   *       x: 0.5,
   *       y: 0.5
   *     }
   *   },
   *
   *   constants: {
   *     RADIUS_BIG:   45,
   *     RADIUS_SMALL: 45 * 0.6
   *   }
   * } );
   */
  constructor: function GamepadStick ( options ) {
    var self = this;

    this.__super__.call( this, options );

    this._location = {
      current: new Vector2D(),
      start:   new Vector2D()
    };

    this._resize();

    function touchstart ( event ) {
      var touches = event.changedTouches;
      var unset   = true;
      var i, touched;

      for ( i = touches.length - 1; i >= 0; --i ) {
        self._touch( touches[ i ], ( touched = self._intersects( touches[ i ] ) ) );

        if ( touched && unset ) {
          unset = false;
          self._location.start.set( touches[ i ].clientX, touches[ i ].clientY );
          self._reset( 'touchstart' );
        }
      }
    }

    function touchmove ( event ) {
      var touches = event.changedTouches;
      var i;

      for ( i = touches.length - 1; i >= 0; --i ) {
        if ( self._touched[ touches[ i ].identifier ] ) {
          self._location.current
            .set(
              touches[ i ].clientX - self._location.start.x,
              touches[ i ].clientY - self._location.start.y )
            .limit( self._constants.RADIUS_BIG );
          self._reset( 'touchmove' );
          break;
        }
      }
    }

    function touchend ( event ) {
      var touches = event.changedTouches;
      var unset   = true;
      var i;

      for ( i = touches.length - 1; i >= 0; --i ) {
        if ( self._touched[ touches[ i ].identifier ] ) {
          if ( unset ) {
            unset = false;
            self.cancel();
          }

          self._touched[ touches[ i ].identifier ] = false;
        }
      }
    }

    window.addEventListener( 'touchstart', touchstart );
    window.addEventListener( 'touchmove', touchmove );
    window.addEventListener( 'touchend', touchend );
  },

  /**
   * @private
   * @method module:gamepad.GamepadStick#_reset
   * @param  {string} state
   * @return {void}
   */
  _reset: function _reset ( state ) {
    this._rendered = false;
    this._angle    = null;
    this._value    = null;
    this._state    = state;
  },

  /**
   * @method module:gamepad.GamepadStick#render
   * @return {void}
   */
  render: function render () {
    if ( this._rendered ) {
      return;
    }

    this._renderer
      .restore() // ?????????????? SETTRANSFORM BELOW!!!!
      .clear()
      .save() // ?????????????? SETTRANSFORM BELOW!!!!
      .setTransform( 1, 0, 0, 1, this._location.start.x, this._location.start.y )
      .fill( this._colors[ this._state ] )
      .arc( 0, 0, this._constants.RADIUS_BIG )
      .arc( this._location.current.x, this._location.current.y, this._constants.RADIUS_SMALL );

    this._rendered = true;
  },

  /**
   * @method module:gamepad.GamepadStick#value
   * @return {number}
   */
  value: function value () {
    if ( this._value === null ) {
      this._value = this._location.current.mag() / this._constants.RADIUS_BIG;
    }

    return this._value;
  },

  /**
   * @method module:gamepad.GamepadStick#angle
   * @return {number}
   */
  angle: function angle () {
    if ( this._angle === null ) {
      this._angle = this._location.current.angle();
    }

    return this._angle;
  },

  /**
   * @method module:gamepad.GamepadStick#cancel
   * @return {void}
   */
  cancel: function cancel () {
    this._reset( 'touchend' );
    this._location.current.set( 0, 0 );
    this._location.start.set( this._x, this._y );
    this._touched.length = 0;
  }
} );

module.exports = GamepadStick;
