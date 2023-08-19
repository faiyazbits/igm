import Model, { attr, hasMany } from '@ember-data/model';
import moment from 'moment-timezone';

export default class LeagueTableModel extends Model {
  @hasMany('destination', { async: true, inverse: null }) destinations;
  @attr('string') currencyEquivalent;
  @attr('string') frequency;
  @attr('string') name;
  @attr() result;
  @attr('utc', { defaultValue: () => moment.utc() }) updatedAt;

  get displayTime() {
    return this.updatedAt.format('DD-MMM-YYYY, HH:mm');
  }
}
