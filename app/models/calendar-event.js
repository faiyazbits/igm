import Model, { attr, belongsTo } from '@ember-data/model';
import moment from 'moment-timezone';

export default class CalendarEventModel extends Model {
  @belongsTo('country', { async: true, inverse: 'calendarEvents' }) country;

  @attr('number') actual;
  @attr('boolean', { defaultValue: false }) allDay;
  @attr('number') consensus;
  @attr('utc', { defaultValue: () => moment.utc() }) dateTime;
  @attr('string', { defaultValue: 'data' }) eventType;
  @attr('string', { defaultValue: '' }) period;
  @attr('string') name;
  @attr('string', { defaultValue: '' }) prefix;
  @attr('number') previous;
  @attr('string', { defaultValue: '' }) suffix;

  get day() {
    return this.dateTime.format('dddd, MMMM Do');
  }

  get displayActual() {
    return this._formatValueForDisplay(this.actual);
  }

  get displayConsensus() {
    return this._formatValueForDisplay(this.consensus);
  }

  get displayTime() {
    return this.dateTime.format('HH:mm');
  }

  get displayPrevious() {
    return this._formatValueForDisplay(this.previous);
  }

  _formatValueForDisplay(value) {
    if (value === null) {
      return '';
    } else {
      const prefix = this.prefix || '';
      const suffix = this.suffix || '';

      return `${prefix}${value}${suffix}`;
    }
  }
}
