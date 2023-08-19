import Model, { attr } from '@ember-data/model';

export default class RegionModel extends Model {
  @attr('string') name;
}
