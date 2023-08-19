import Model, { attr, belongsTo } from '@ember-data/model';

export default class FeedsUsersSubscriptionModel extends Model {
  @belongsTo('user', { async: true, inverse: 'feedsUsersSubscription' }) user;
  @belongsTo('subscription', { async: true }) subscription;
  @attr('utc') startOn;
  @attr('utc') endOn;
}
