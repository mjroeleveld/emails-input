// I could have chosen to generate two separate CSS files from this but opted
// not to for simplicity and since the added overhead from the theme CSS is
// neglectible
import './base.scss';
import './theme.scss';

import EmailsInput from './EmailsInput';

export default function EmailsInputFactory(...args) {
  return new EmailsInput(...args);
}
