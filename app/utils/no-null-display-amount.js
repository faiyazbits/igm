import formatLargeNumber from '../utils/format-large-number';

export default function noNullDisplayAmount(amount, currency = '') {
  if (amount === null || amount === 0) {
    return '';
  } else {
    return currency + ' ' + formatLargeNumber(amount);
  }
}
