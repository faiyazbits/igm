import AuthenticatedRoute from '../authenticated/route';
import { service } from '@ember/service';
import { set } from '@ember/object';

export default class FeedRoute extends AuthenticatedRoute {
  @service feedFactory;
  @service store;
  async model(params) {
    const feed = this.store.findRecord('feed', params.feed_id);
    return feed;
  }

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      set(controller, 'fullscreen', false);
    }
  }
}
