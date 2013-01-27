button
====

A UI on/off button component for use with [component](https://github.com/component/component). Bind to an input field and turn it into a sleek button.

Tested in Chrome, Firefox, Safari, Opera, IE9+

Styles inspired by [Hugh Giraudel](http://tympanus.net/Tutorials/CSS3ButtonSwitches/index.html)

[Check out the related dial component](http://jsantell.github.com/dial)

[View Example](http://jsantell.github.com/button)

## Installation

```
component install jsantell/button
```

## API

### new Button(inputEl, [on])

Create a new button instance, linked to `inputEl`. On status is determined by the checked state of the input, or you may pass in a boolean `on` to set the initial state. On instantiation, the button is rendered, original checkbox hidden, and events bound.

```js
var Button = require('button');
var input = document.getElementById('inputEl');
var button = new Button(input, true);
```

### Button#set(val)

Sets button to either on or off based off of `val`'s truthiness.

### Button#render()

Reconstructs the button's `el` property containing the button element. Already called during instantiation.

### Button#bind()

Binds events necessary for the button on the button element, as well as the input element.

### Button#unbind()

Unbinds the events related to the button.

### Button#hideInput()

Hides the corresponding input field. Already called on instantiation.

### Button#showInput()

Displays the corresponding input field. Called on destroy, or call it manually to display the element.

### Button#destroy()

Destroys the button element, reveals original input element and unbinds button events

## Events

Button inherits from [Emitter](https://github.com/component/emitter), so all emitter methods apply. By default, only a `change` event is fired when the button's value changes, which can be hooked into via:

```js
var button = new Button(input);
button.on('change', function (val) {
  console.log('Is button on? ' + val);
});
```
