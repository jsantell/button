/**
 * Module dependencies
 */

var
  Emitter   = require('emitter'),
  events    = require('event'),
  domify    = require('domify'),
  classes   = require('classes'),
  template  = require('./template');

/**
 * Expose `Button`
 */

module.exports = Button;

/**
 * A constructor for a Button object,
 * creating an on/off button from
 * a checkbox input
 *
 * @param {HTMLInputElement} input
 * @param {Boolean} value
 * @api public
 */

function Button (input, value) {
  this.input = input;
  this.value = value !== undefined
    ? value
    : input.checked;

  Emitter(this);

  this
    .render()
    .bind()
    .set(this.value)
    .hideInput();


  this.input.parentNode.appendChild(this.el);
}

/**
 * Creates the button's `el` property
 *
 * @return {Button}
 * @api public
 */

Button.prototype.render = function () {
  this.el = domify(template)[0];
  return this;
};

/**
 * Binds click events for the button element
 *
 * @return {Button}
 * @api public
 */

Button.prototype.bind = function () {
  var that = this;

  events.bind(this.el, 'click', clickHandler);
  events.bind(this.input, 'change', inputChangeHandler);

  /**
  * Unbinds button's events, not on prototype
  * due to unbinding event on input element in scope
  *
  * @return {Button}
  * @api public
  */
  
  this.unbind = function () {
    events.unbind(this.el, 'click');
    events.unbind(this.input, 'change', inputChangeHandler);
    return this;
  };
  
  function clickHandler() {
    onClick.apply(that, arguments);
  }
 
  function inputChangeHandler () {
    that.set(that.input.checked);
  }
  
  return this;
};

/**
 * Removes button element, reveals original input element,
 * unbinds button events.
 *
 * @return {Button}
 * @api public
 */

Button.prototype.destroy = function () {
  var parent = this.el.parentElement;
  this.unbind();
  this.showInput();
  parent.removeChild(this.el);
  return this;
};

/**
 * Sets the button's value if in allowed range,
 * rounds to integer if needed, updates the corresponding
 * input element, rotates button and fires a change event
 *
 * @param {Number} val
 * @return {Button}
 * @api public
 */

Button.prototype.set = function (val) {
  val = !!val;
  this.input.checked = val;
  this.value = val;
  this.emit('change', val);
  classes(this.el)[val ? 'add' : 'remove']('on');
  return this;
};

/**
 * Hides original input element
 *
 * @return {Button}
 * @api public
 */

Button.prototype.hideInput = function () {
  this.originalDisplay = this.originalDisplay || this.input.style.display;
  this.input.style.display = 'none';
  return this;
};

/**
 * Shows original input element
 *
 * @return {Button}
 * @api public
 */

Button.prototype.showInput = function () {
  this.input.style.display = this.originalDisplay;
  return this;
};

function onClick (e) {
  this.set(!this.value);
}
