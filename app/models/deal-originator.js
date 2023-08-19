import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class DealOriginatorModel extends Model {
  @belongsTo('deal', { async: true, inverse: 'dealOriginator' }) deal;
  @attr('string') name;
  @belongsTo('deal-originator', { async: true, inverse: 'mergees' }) merger;
  @hasMany('deal-originator', { async: true, inverse: 'merger' }) mergees;
}
