import './styles.scss';

import EmailsInput from './EmailsInput';

export default function EmailsInputFactory(...args) {
  return new EmailsInput(...args);
}
