import { helper } from '@ember/component/helper';
import moment from 'moment/moment';

export default helper(function formatDate(params, namedArgs) {
  const date = params[0];
  if(namedArgs.attr == "at"){
    var format = namedArgs.customFormat || 'MMMM D YYYY [at] H:mm';
  }
  else{
    var format = namedArgs.customFormat || 'MMMM D YYYY H:mm';
  }

  if (date) {
    const momentDate = moment(date);
    if (namedArgs.utc) {
      momentDate.utc();
    }
    const inputString = momentDate.format(format);
    return inputString;
  } else {
    return '-';
  }
});
