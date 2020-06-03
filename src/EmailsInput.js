import InputValue from './InputValue';

class EmailsInput {
  /**
   * Default options.
   * @type {{placeholderText: string}}
   */
  static defaultOpts = {
    placeholderText: 'add more people...',
  };

  /**
   * Input container HTML element.
   * @type {HTMLElement}
   * @private
   */
  _elem = null;

  /**
   * Subscribed listeners.
   * @type {function[]}
   * @private
   */
  _listeners = [];

  /**
   * Input values.
   * @type {InputValue[]}
   * @private
   */
  _values = [];

  /**
   * Construct an emails input.
   * @param {HTMLElement} elem - HTML element to be bind the EmailsInput instance
   * to.
   * @param {Object} opts - Options
   * @param {Number} opts.placeholderText - Input placeholder text
   */
  constructor(elem, opts = {}) {
    if (typeof elem !== 'object') {
      throw new Error("EmailsInput() expects a HTMLElement as argument");
    }

    this._elem = elem;
    this._opts = {
      ...EmailsInput.defaultOpts,
      ...opts,
    };

    this.init();
  }

  /**
   * Return the string value representation of the values.
   * @returns {String[]}
   * @private
   */
  get _stringValues() {
    return this._values.map(value => value.toString());
  }

  /**
   * Return reference to values container DOM element.
   * @returns {HTMLElement}
   * @private
   */
  get _valuesElem() {
    return this._elem.querySelector('.EmailsInput-values');
  }

  /**
   * Return reference to input DOM element.
   * @returns {HTMLElement}
   * @private
   */
  get _inputElem() {
    return this._elem.querySelector('.EmailsInput-input');
  }

  /**
   * Add a value to the list of values.
   * @param {string} value - The value to be added.
   */
  addValue(value) {
    const self = this;

    // Create InputValue instance
    const instance = new InputValue(value, function() {
      self.removeValue(this);
    });
    this._values.push(instance);

    // Append value to values in DOM
    this._valuesElem.insertBefore(
      instance.render(),
      this._inputElem
    );

    this._notifyListeners();
  }

  /**
   * Get all values.
   * @return {String[]}
   */
  getAllValues() {
    return this._stringValues;
  }

  /**
   * Get valid values.
   * @return {String[]}
   */
  getValidValues() {
    return this._values
      .filter(val => val.isValid())
      .map(value => value.toString());
  }

  /**
   * Replace all current values by the given values.
   * @param {String[]} values - The new values
   */
  replaceAllValues(values) {
    this._values.forEach(val => this.removeValue(val));
    values.forEach(val => this.addValue(val));
  }

  /**
   * Remove a value by reference.
   * @param {InputValue} value - Reference to InputValue to be removed.
   * @private
   */
  removeValue(value) {
    // Remove DOM element
    value.elem.parentNode.removeChild(value.elem);

    this._values = this._values.filter(val => val !== value);
    this._notifyListeners();
  }

  /**
   * Subscribe to any changes to the values.
   * @param {Function} listener - Listener function
   */
  subscribe(listener) {
    this._listeners.push(listener);
  }

  /**
   * Unsubscribe listener.
   * @param {Function} listener - Listener function
   */
  unsubscribe(listener) {
    this._listeners = this._listeners.filter(func => func !== listener);
  }

  /**
   * (Re)initialize EmailsInput instance. Renders an empty form.
   */
  init() {
    this._elem.classList.add('EmailsInput');
    this._elem.innerHTML = `<div class="EmailsInput-values"></div>`;
    this._createInput();
  }

  /**
   * Reset EmailsInput instance.
   *
   * Unsubscribes listeners and clears values.
   */
  reset() {
    this._values = [];
    this._listeners = [];
    // Reset DOM elements
    this._elem.innerHTML = `<div class="EmailsInput-values"></div>`;
  }

  /**
   * Notify all listeners with current values.
   * @private
   */
  _notifyListeners() {
    this._listeners.forEach(listener => listener.call(this, this._stringValues));
  }

  /**
   * Create input element and attach listeners.
   * @private
   */
  _createInput() {
    // Create element
    const elem = document.createElement("input");
    elem.type = 'text';
    elem.placeholder = this._opts.placeholderText;
    elem.classList.add('EmailsInput-input');

    const addInputValue = () => {
      if (!elem.value) return;
      this.addValue(elem.value);
      elem.value = '';
    };

    // Add value on <enter> or comma
    elem.addEventListener('keydown', event => {
      if (event.keyCode === 13 || event.keyCode === 188) {
        addInputValue();
      }
    });

    // Add value on blur
    elem.addEventListener('blur', () => {
      addInputValue();
    });

    // Add comma-separated values when pasted
    elem.addEventListener('paste', () => {
      const text = (event.clipboardData || window.clipboardData)
        .getData('text');
      text.split(',').map(val => this.addValue(val));
      // Clear value after the actual paste handler has copied in the text
      setTimeout(() => elem.value = '');
    });

    // Focus input when clicking on the container elem
    this._elem.addEventListener('click', () => {
      elem.focus();
    });

    this._valuesElem.append(elem);
  }
}

export default EmailsInput;
