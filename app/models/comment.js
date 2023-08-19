import Model, { attr, belongsTo } from '@ember-data/model';

export default class CommentModel extends Model {
  @belongsTo('commentary', { async: true, inverse: null }) user;

  @attr('string') body;
  @attr('date', { serialize: false }) createdAt;
  @attr('date', { serialize: false }) updatedAt;
}
