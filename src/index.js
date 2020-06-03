import './base.scss';
import './theme.scss';

import EmailsInput from './EmailsInput';

export default function EmailsInputFactory(...args) {
  return new EmailsInput(...args);
}
