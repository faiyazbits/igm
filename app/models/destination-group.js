import Model, { attr, hasMany } from '@ember-data/model';

export default class DestinationGroupModel extends Model {
  @hasMany('destination', { async: true, inverse: null }) destinations;

  @attr('string') name;
}
