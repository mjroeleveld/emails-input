import InputValue from './InputValue'

export interface EmailsInputOpts {
  placeholderText: string,
}

export interface EmailsInputUserOpts {
  placeholderText?: string,
}

export interface EmailsInputChangeListener {
  (values: string[]): void,
}

export interface InputValueRemoveCallback {
  (this: InputValue): void,
}
