import { action, computed, get } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import moment from 'moment-timezone';

export default class DatetimePickerComponent extends Component {
  isCalEvent = false;
  timeZone = null;
  @tracked flatpickerRef = null;
  @tracked isOpen = false;

  get date() {
    if (this.args.date && this.args.date._isAMomentObject) {
      return this.args.date.toDate().toUTCString();
    }
    return this.args.date || null;
  }

  get pickTime() {
    return this.args.pickTime || false;
  }

  get placeholder() {
    return this.args.placeholder || 'MM/DD/YYYY';
  }

  get dateFormat() {
    if (this.pickTime) {
      return 'm/d/Y h:i K';
    } else {
      return 'm/d/Y';
    }
  }

  @action
  togglePicker() {
    if (this.isOpen) {
      this.flatpickerRef.close();
      this.isOpen = false;
    } else {
      this.flatpickerRef.open();
      this.isOpen = true;
    }
  }

  @action
  blur(e) {
    this.isOpen = false;
  }

  @action
  focus(e) {
    this.isOpen = true;
  }

  @action
  ready(selectedDates, dateStr, flatpickerRef) {
    this.flatpickerRef = flatpickerRef;
  }

  @action
  onChange(dateObjects) {
    if (!this.args.onChange) {
      throw new Error('onChange action handler for date picker is mandatory');
    }
    let selectedJSDate = dateObjects[0];
    let momentDate = this.convertJSDateToMoment(selectedJSDate);
    this.args.onChange(momentDate);
  }

  convertJSDateToMoment(jsDate) {
    const momentDate = moment.utc(); // Create an empty Moment object with UTC mode

    // Set the date and time components from the JavaScript Date object
    momentDate.year(jsDate.getFullYear());
    momentDate.month(jsDate.getMonth());
    momentDate.date(jsDate.getDate());
    momentDate.hour(jsDate.getHours());
    momentDate.minute(jsDate.getMinutes());
    momentDate.second(jsDate.getSeconds());
    momentDate.millisecond(0);
    return momentDate;
  }
}
