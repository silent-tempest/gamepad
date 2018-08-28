'use strict';

var Renderer2D   = require( 'v6.js/Renderer2D' );
var Vector2D     = require( 'v6.js/math/Vector2D' );
var LightEmitter = require( 'light-emitter' );
var extend       = require( 'super-extend' );
var denormalize  = require( '../internal/denormalize' );

var IGamepadPart = extend( LightEmitter, {
  /**
   * @constructor module:gamepad.IGamepadPart
   * @extends {LightEmitter}
   * @param   {object}            options
   * @param   {object}            options.options
   * @param   {IVector2D}         options.options.position
   * @param   {IGamepadConstants} options.constants
   * @param   {IGamepadColors}    options.colors
   */
  constructor: function IGamepadPart ( options ) {
    this.__super__.call( this );
    this._position  = Vector2D.clone( options.options.position );
    this._constants = options.contants;
    this._colors    = options.colors;
    this._renderer  = new Renderer2D().noStroke();
    this._touched   = [];
  },

  /**
   * @private
   * @method module:gamepad.IGamepadPart#_update
   * @return {void}
   */
  _update: function _update () {
    this.setX( this._position.x );
    this.setY( this._position.y );
  },

  /**
   * @method module:gamepad.IGamepadPart#setX
   * @param  {number} normalizedX A value that is between -1 and 1.
   * @return {void}
   */
  setX: function setX ( normalizedX ) {
    this._x = denormalize( this._position.x = normalizedX, this.renderer.w );
  },

  /**
   * @method module:gamepad.IGamepadPart#setY
   * @param  {number} normalizedY A value that is between -1 and 1.
   * @return {void}
   */
  setY: function setY ( normalizedY ) {
    this._y = denormalize( this._position.y = normalizedY, this.renderer.h );
  }
} );

module.exports = IGamepadPart;
