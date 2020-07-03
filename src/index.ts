import './base.scss';
import './theme.scss';

import EmailsInput from './EmailsInput';

export default function EmailsInputFactory(...args: any[]) {
  // @ts-ignore
  return new EmailsInput(...args);
}
