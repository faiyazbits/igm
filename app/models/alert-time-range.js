import Model, { attr, belongsTo } from '@ember-data/model';
import { equal } from '@ember/object/computed';
import moment from 'moment-timezone';

export default class AlertTimeRangeModel extends Model {
  @belongsTo('alert', { async: true, inverse: 'alert-time-range' }) alert;

  @attr('number') startAt;
  @attr('boolean', { defaultValue: false }) enabled;
  @attr('number') endAt;
  @attr('string', { serialize: false }) timeZone;

  timeOptions = [
    [0, '00:00'],
    [1, '01:00'],
    [2, '02:00'],
    [3, '03:00'],
    [4, '04:00'],
    [5, '05:00'],
    [6, '06:00'],
    [7, '07:00'],
    [8, '08:00'],
    [9, '09:00'],
    [10, '10:00'],
    [11, '11:00'],
    [12, '12:00'],
    [13, '13:00'],
    [14, '14:00'],
    [15, '15:00'],
    [16, '16:00'],
    [17, '17:00'],
    [18, '18:00'],
    [19, '19:00'],
    [20, '20:00'],
    [21, '21:00'],
    [22, '22:00'],
    [23, '23:00'],
  ].map((array) => {
    return { value: array[0] * 60 * 60, label: array[1] };
  });

  get utcStartTime() {
    const startAt = this.startAt;
    return moment.utc().startOf('day').add(startAt, 'seconds');
  }

  get utcEndTime() {
    const endAt = this.endAt;
    return moment.utc().startOf('day').add(endAt, 'seconds');
  }

  get utcStart() {
    const startTime = this.utcStartTime;
    return startTime.format('HH:mm');
  }

  get utcEnd() {
    const endTime = this.utcEndTime;
    return endTime.format('HH:mm');
  }

  get utcOffset() {
    const startTime = this.utcStartTime.clone();
    const timeZone = this.timeZone;
    return startTime.tz(timeZone).format('Z');
  }

  get localStartTime() {
    const startTime = this.utcStartTime.clone();
    const timeZone = this.timeZone;
    return startTime.tz(timeZone);
  }

  get localEndTime() {
    const endTime = this.utcEndTime.clone();
    const timeZone = this.timeZone;
    return endTime.tz(timeZone);
  }

  get localStartAt() {
    const localStartTime = this.localStartTime;
    return localStartTime.diff(
      localStartTime.clone().startOf('day'),
      'seconds'
    );
  }

  set localStartAt(value) {
    const timeZone = this.timeZone;
    const startOfDay = moment.tz(timeZone).startOf('day');
    const utcStartAt = startOfDay.clone().add(value, 'seconds').utc();
    const startAt = utcStartAt.diff(
      utcStartAt.clone().startOf('day'),
      'seconds'
    );

    this.startAt = startAt;
    return value;
  }

  get localEndAt() {
    const localEndTime = this.localEndTime;
    return localEndTime.diff(localEndTime.clone().startOf('day'), 'seconds');
  }

  set localEndAt(value) {
    const timeZone = this.timeZone;
    const startOfDay = moment.tz(timeZone).startOf('day');
    const utcEndAt = startOfDay.clone().add(value, 'seconds').utc();
    const endAt = utcEndAt.diff(utcEndAt.clone().startOf('day'), 'seconds');

    this.endAt = endAt;
    return value;
  }

  get localStart() {
    const startTime = this.localStartTime;
    return startTime.format('HH:mm');
  }

  get localEnd() {
    const endTime = this.localEndTime;
    return endTime.format('HH:mm');
  }

  get startAtOption() {
    const startAt = this.localStartAt;
    const timeOptions = this.timeOptions;

    return timeOptions.find((option) => {
      return option.value === startAt;
    });
  }

  get endAtOption() {
    const endAt = this.localEndAt;
    const timeOptions = this.timeOptions;

    return timeOptions.find((option) => {
      return option.value === endAt;
    });
  }

  get isAllDay() {
    const startAt = this.localStartAt;
    const endAt = this.localEndAt;

    return startAt === 0 && endAt === 0;
  }

  get label() {
    const localStart = this.localStart;
    const localEnd = this.localEnd;

    if (this.isAllDay) {
      return 'All day';
    } else {
      return `${localStart} - ${localEnd}`;
    }
  }

  get endAtTenPmUtc() {
    return this.endAt == 79200;
  }
}
