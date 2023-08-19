import Model, { attr, belongsTo } from '@ember-data/model';

export default class ApiKeyModel extends Model {
  @belongsTo('user', { async: true, inverse: 'apiKey' }) user;

  @attr('string') accessToken;
}
