class InputValue {
  valid = true;

  constructor(value) {
    this.value = value;

    this.validate();
  }

  /**
   * Validate the input's value to be an email address.
   * @returns {Boolean}
   */
  validate() {

  }

  /**
   * Get string value.
   * @returns {String}
   */
  toString() {
    return this.value;
  }

  /**
   * Render the input value.
   * @returns {String}
   */
  render() {

  }
}

export default InputValue;
