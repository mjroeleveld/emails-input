import './base.scss';

// I could have generated a separate .css file, but I have chosen not to for the
// sake of simplicity
import './theme.scss';

import EmailsInput from './EmailsInput';

export default function EmailsInputFactory(...args) {
  return new EmailsInput(...args);
}
