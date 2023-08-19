import { helper } from '@ember/component/helper';

export default helper(function formatBoolean(params) {
  return params[0] ? 'Yes' : 'No';
});
