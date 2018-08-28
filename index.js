'use strict';

/**
 * @module gamepad
 */

// Interfaces

/**
 * An interface that describes `options.colors` object in `new gamepad.Gamepad(options)`.
 * @global
 * @interface IGamepadColors
 * @property {TColor} touchstart
 * @property {TColor} touchmove
 * @property {TColor} touchend
 */

/**
 * @global
 * @interface IGamepadConstants
 * @property {number} [RADIUS_BIG=45]
 * @property {number} [RADIUS_SMALL=27]
 */

/**
 * A 2D vector.
 * @global
 * @interface IVector2D
 * @property {number} x
 * @property {number} y
 * @example <caption>A plain object</caption>
 * var vector = {
 *   x: 0.5,
 *   y: 0.5
 * };
 * @example <caption>An instance of v6.Vector2D</caption>
 * var vector = new v6.Vector2D( 0.5, 0.5 );
 */

// Type definitions

/**
 * A color that passed directly to v6.js Renderer.
 * @global
 * @typedef {object|string}
 * @name TColor
 * @example <caption>An object</caption>
 * var color = new v6.HSLA( 0, 100, 50 );
 * var color = new v6.RGBA( 255, 0, 0 );
 * @example <caption>A string</caption>
 * var color = '#ff0000ff';
 * var color = 'red';
 */

// Exports

exports.Gamepad       = require( './core/Gamepad' );
exports.GamepadStick  = require( './core/parts/GamepadStick' );
exports.GamepadButton = require( './core/parts/GamepadButton' );
