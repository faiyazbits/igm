import Model, { attr } from '@ember-data/model';

export default class TimeZoneModel extends Model {
  @attr() zones;
  @attr() zoneNames;
}
