import Model, { attr, hasMany } from '@ember-data/model';

export default class TechnicalCompositeModel extends Model {
  @hasMany('destination', { async: true, inverse: null }) destinations;
  @hasMany('technical', { async: true, inverse: null }) technicals;

  @attr('string') name;
  @attr('date') feedSortDate;
}
