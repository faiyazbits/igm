import Model, { attr, belongsTo } from '@ember-data/model';

export default class ManagerModel extends Model {
  @belongsTo('bank', { async: true, inverse: null }) bank;
  @belongsTo('deal', { async: true, inverse: null }) deal;

  @attr('string') dealType;
  @attr('string') managerType;
  @attr('number') sort;
}
