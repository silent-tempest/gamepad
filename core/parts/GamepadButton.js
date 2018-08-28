'use strict';

var extend              = require( 'super-extend' );
var IGamepadDefaultPart = require( './IGamepadDefaultPart' );

var GamepadButton = extend( IGamepadDefaultPart, {
  /**
   * @memberOf module:gamepad
   * @constructor GamepadButton
   * @extends {module:gamepad.IGamepadDefaultPart}
   * @example
   * var GamepadButton = require( 'gamepad/core/parts/GamepadButton' );
   */
  constructor: function GamepadButton ( options ) {
    var self = this;

    this.__super__.call( this, options );
    this._resize();

    function touchstart ( event ) {
      var touches = event.changedTouches;
      var i, touched;

      for ( i = touches.length - 1; i >= 0; --i ) {
        if ( ( touched = self._intersects( touches[ i ] ) ) ) {
          self._reset( 'touchstart' );
        }

        self._touch( touches[ i ], touched );
      }
    }

    function touchmove ( event ) {
      var touches = event.changedTouches;
      var i, l, touched;

      for ( i = 0, l = touches.length; i < l; ++i ) {
        if ( ( touched = self._intersects( touches[ i ] ) ) ) {
          if ( self.state === 'touchend' ) {
            self._reset( 'touchstart' );
          }
        } else if ( self._touch( touches[ i ] ) ) {
          self._reset( 'touchend' );
        }

        self._touch( touches[ i ], touched );
      }
    }

    function touchend ( event ) {
      var touches = event.changedTouches;
      var i;

      for ( i = touches.length - 1; i >= 0; --i ) {
        if ( self._touch( touches[ i ] ) ) {
          self._touch( touches[ i ], false );
          self._reset( 'touchend' );
        }
      }
    }

    window.addEventListener( 'touchstart', touchstart );
    window.addEventListener( 'touchmove', touchmove );
    window.addEventListener( 'touchend', touchend );
  },

  /**
   * @private
   * @method module:gamepad.GamepadButton#_reset
   * @param  {string} state
   * @return {void}
   */
  _reset: function _reset ( state ) {
    this._rendered = false;
    this._state    = state;
  },

  /**
   * @method module:gamepad.GamepadButton#render
   * @return {void}
   */
  render: function render () {
    if ( this._rendered ) {
      return;
    }

    this._renderer
      .clear()
      .fill( this._colors[ this._state ] )
      .arc( this._x, this._y, this._constants.RADIUS_BIG );

    this._rendered = true;
  },

  /**
   * @method module:gamepad.GamepadButton#cancel
   * @return {void}
   */
  cancel: function cancel () {
    this._reset( 'touchend' );
    this._touched.length = 0;
  }
} );

module.exports = GamepadButton;
