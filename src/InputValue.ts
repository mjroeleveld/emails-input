import { InputValueRemoveCallback } from './types'

class InputValue {
  /**
   * Email regex used for validation (from https://emailregex.com/).
   */
  static EMAIL_REGEX: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  /**
   * Holds reference to rendered DOM element once rendered.
   */
  elem: (HTMLElement | null) = null;

  /**
   * String value.
   */
  private readonly _value: string = '';

  /**
   * Flag indicating if the value is a valid email address.
   */
  private readonly _valid: boolean = false;

  /**
   * Callback to be called when the remove button is pressed.
   */
  private _removeCallback: (InputValueRemoveCallback | null) = null;

  /**
   * Construct an input value.
   */
  constructor(value: string, removeCallback: InputValueRemoveCallback) {
    if (typeof value !== "string") {
      throw new Error('InputValue() expects a string as argument');
    }

    this._value = value;
    this._removeCallback = removeCallback;
    this._valid = this.isValid();
  }

  /**
   * Check whether the input's value is a valid email address.
   */
  isValid(): boolean {
    return !!this._value.match(InputValue.EMAIL_REGEX);
  }

  /**
   * Get string value.
   */
  toString(): string {
    return this._value;
  }

  /**
   * Render the input value.
   */
  render(): HTMLElement {
    if (this.elem) return this.elem;

    // Create elem
    const elem = this.elem = document.createElement('div');
    elem.classList.add('EmailsInput-value');
    if (!this._valid) elem.classList.add('EmailsInput-invalid');
    elem.textContent = this._value;

    // Add remove button
    const button = document.createElement('button');
    button.classList.add('EmailsInput-button');
    button.textContent = 'x';
    elem.append(button);
    button.addEventListener('click', this._removeCallback!.bind(this));

    return elem;
  }
}

export default InputValue;
