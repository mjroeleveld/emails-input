import InputValue from './InputValue';

class EmailsInput {
  /**
   * Subscribed listeners.
   * @type {function[]}
   */
  listeners = [];

  /**
   * Input values.
   * @type {InputValue[]}
   */
  values = [];

  /**
   * EmailsInput constructor.
   * @param {HTMLElement} elem
   * @param {Object} opts
   */
  constructor(elem, opts = {}) {
    this.opts = {
      ...opts,
    };

    this.init();
  }

  /**
   * Add a value to the list of values.
   * @param {string} value
   */
  add(value) {
  }

  /**
   * Get all values.
   * @return {String[]}
   */
  getAll() {
    return this.values.map(value => value.toString());
  }

  /**
   * Get valid values.
   * @return {String[]}
   */
  getValid() {
    return [];
  }

  /**
   *
   * @param {String[]} values
   */
  replaceAll(values) {

  }

  /**
   *
   * @param listener
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   *
   * @param listener
   */
  unsubscribe(listener) {
    this.listeners = this.listeners.filter(func => func === listener);
  }

  /**
   * (Re)initialize EmailsInput element. Renders an empty form.
   */
  init() {
    this.destroy();
  }

  /**
   *
   */
  destroy() {
    this.values = [];
    this.listeners.map(this.unsubscribe.bind(this));
  }
}

export default EmailsInput;
