import Model, { attr, hasMany } from '@ember-data/model';

export default class CountryModel extends Model {
  @hasMany('calendar-event', { async: true, inverse: 'country' })
  calendarEvents;
  @hasMany('issuer', { async: true, inverse: 'country' }) issuers;

  @attr('string') name;
  @attr('string') countryCode;
}
