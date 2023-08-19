import Model, { attr, belongsTo } from '@ember-data/model';

export default class CommentaryModel extends Model {
  @belongsTo('user', { async: true, inverse: null }) user;
  @attr('string') headline;
  @attr('string') body;
  @attr('date', { serialize: false }) createdAt;
  @belongsTo('technical', { async: true, inverse: 'commentaries' }) technical;
  @attr('date', { serialize: false }) updatedAt;
}
