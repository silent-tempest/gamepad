'use strict';

var extend       = require( 'super-extend' );
var intersects   = require( '../internal/intersects' );
var IGamepadPart = require( './IGamepadPart' );

var IGamepadDefaultPart = extend( IGamepadPart, {
  /**
   * @constructor module:gamepad.IGamepadDefaultPart
   * @extends {module:gamepad.IGamepadPart}
   */
  constructor: function IGamepadDefaultPart ( options ) {
    this.__super__.call( this, options );
    window.addEventListener( 'resize', this._resize.bind( this ) );
  },

  /**
   * @private
   * @method module:gamepad.IGamepadDefaultPart#_resize
   * @param  {Event} [event]
   * @return {void}
   */
  _resize: function _resize ( event ) {
    if ( event ) {
      this._renderer.resizeTo( window );
      this.emit( 'resize', event );
    }

    this.cancel();
    this._update();
  },

  /**
   * @private
   * @method module:gamepad.IGamepadDefaultPart#_intersects
   * @param  {object} touch
   * @return {boolean}
   */
  _intersects: function _intersects ( touch ) {
    return intersects( this._x, this._y, this._constants.RADIUS_BIG, touch.clientX, touch.clientY );
  },

  /**
   * @private
   * @method module:gamepad.IGamepadDefaultPart#_touch
   * @param  {object}   touch
   * @param  {boolean}  [value]
   * @return {void}
   */
  _touch: function _touch ( touch, value ) {
    if ( typeof value === 'undefined' ) {
      return this._touched[ touch.identifier ];
    }

    this._touched[ touch.identifier ] = value;
  }
} );

module.exports = IGamepadDefaultPart;
