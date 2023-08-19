import { helper } from '@ember/component/helper';

export default helper(function formatString(params) {
  const stringValue = params[0];
  if (stringValue === null || stringValue === 'NULL') {
    return '';
  } else {
    return stringValue;
  }
});
