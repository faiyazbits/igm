export default function formatLargeNumber(number) {
  if (number >= Math.pow(10, 12)) {
    // trillion
    number = (number / Math.pow(10, 12)).toFixed(2) + 'tn';
  } else if (number < Math.pow(10, 12) && number >= Math.pow(10, 9)) {
    // billion
    number = (number / Math.pow(10, 9)).toFixed(2) + 'bn';
  } else if (number < Math.pow(10, 9) && number >= Math.pow(10, 6)) {
    // million
    number = (number / Math.pow(10, 6)).toFixed(2) + 'm';
  } else if (number < Math.pow(10, 6) && number >= Math.pow(10, 3)) {
    // thousand
    number = (number / Math.pow(10, 3)).toFixed(2) + 'k';
  } else {
    number = Number(number).toFixed(2);
  }

  return number;
}
