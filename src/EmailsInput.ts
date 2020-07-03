import InputValue from './InputValue';
import { EmailsInputChangeListener, EmailsInputOpts, EmailsInputUserOpts  } from './types'

class EmailsInput {
  /**
   * Element options.
   */
  private readonly _opts: EmailsInputOpts = {
    placeholderText: 'add more people...',
  };

  /**
   * Input container HTML element.
   */
  private _elem: (HTMLElement | null) = null;

  /**
   * Subscribed listeners.
   */
  private _listeners: EmailsInputChangeListener[] = [];

  /**
   * Input values.
   */
  private _values: InputValue[] = [];

  /**
   * Construct an emails input.
   * @param {HTMLElement} elem - HTML element to be bind the EmailsInput instance
   * to.
   * @param {EmailsInputOpts} opts - Options
   * @param {string} opts.placeholderText - Input placeholder text
   */
  constructor(elem: HTMLElement, opts: EmailsInputUserOpts = {}) {
    if (!(elem instanceof HTMLElement)) {
      throw new Error("EmailsInput() expects a HTMLElement as argument");
    }

    this._elem = elem;
    this._opts = {
      ...this._opts,
      ...opts,
    };

    this.init();
  }

  /**
   * Return the string value representation of the values.
   */
  private get _stringValues(): string[] {
    return this._values.map(value => value.toString());
  }

  /**
   * Return reference to values container DOM element.
   */
  private get _valuesElem(): (HTMLElement | null) {
    return this._elem!.querySelector('.EmailsInput-values');
  }

  /**
   * Return reference to input DOM element.
   */
  private get _inputElem(): (HTMLElement | null) {
    return this._elem!.querySelector('.EmailsInput-input');
  }

  /**
   * Add a value to the list of values.
   * @param {string} value - The value to be added.
   */
  addValue(value: string): void {
    const self = this;

    // Create InputValue instance
    const instance = new InputValue(value, function() {
      self.removeValue(this);
    });
    this._values.push(instance);

    // Append value to values in DOM
    this._valuesElem!.insertBefore(
      instance.render(),
      this._inputElem
    );

    this._notifyListeners();
  }

  /**
   * Get all values.
   */
  getAllValues(): string[] {
    return this._stringValues;
  }

  /**
   * Get valid values.
   */
  getValidValues(): string[] {
    return this._values
      .filter(val => val.isValid())
      .map(value => value.toString());
  }

  /**
   * Replace all current values by the given values.
   * @param {string[]} values - The new values
   */
  replaceAllValues(values: string[]): void {
    this._values.forEach(val => this.removeValue(val));
    values.forEach(val => this.addValue(val));
  }

  /**
   * Remove a value by reference.
   * @param {InputValue} value - Reference to InputValue to be removed.
   */
  removeValue(value: InputValue): void {
    // Remove DOM element
    value.elem!.parentNode!.removeChild(value.elem!);

    this._values = this._values.filter(val => val !== value);
    this._notifyListeners();
  }

  /**
   * Subscribe to any changes to the values.
   * @param {EmailsInputChangeListener} listener - Listener function
   */
  subscribe(listener: EmailsInputChangeListener): void {
    this._listeners.push(listener);
  }

  /**
   * Unsubscribe listener.
   * @param {EmailsInputChangeListener} listener - Listener function
   */
  unsubscribe(listener: EmailsInputChangeListener): void {
    this._listeners = this._listeners.filter(func => func !== listener);
  }

  /**
   * (Re)initialize EmailsInput instance. Renders an empty form.
   */
  init(): void {
    this._elem!.classList.add('EmailsInput');
    this._elem!.innerHTML = `<div class="EmailsInput-values"></div>`;
    this._createInput();
  }

  /**
   * Reset EmailsInput instance.
   *
   * Unsubscribes listeners and clears values.
   */
  reset(): void {
    this._values = [];
    this._listeners = [];
    // Reset DOM elements
    this._elem!.innerHTML = `<div class="EmailsInput-values"></div>`;
  }

  /**
   * Notify all listeners with current values.
   */
  private _notifyListeners(): void {
    this._listeners.forEach(listener => listener.call(this, this._stringValues));
  }

  /**
   * Create input element and attach listeners.
   */
  private _createInput(): void {
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
    elem.addEventListener('paste', e => {
      if (!e.clipboardData) return;
      const text = e.clipboardData
        .getData('text');
      text.split(',').map(val => this.addValue(val));
      // Clear value after the actual paste handler has copied in the text
      setTimeout(() => elem.value = '');
    });

    // Focus input when clicking on the container elem
    this._elem!.addEventListener('click', () => {
      elem.focus();
    });

    this._valuesElem!.append(elem);
  }
}

export default EmailsInput;
