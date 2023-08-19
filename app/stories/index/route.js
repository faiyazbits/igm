import { action, get, set } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AuthenticatedRoute from '../../authenticated/route';

export default class StoriesIndexRoute extends AuthenticatedRoute {
  @service feedFactory;
  @service store;

  queryParams = {
    destinations: { refreshModel: true },
    page: { refreshModel: true },
    per: { refreshModel: true },
    tag: { refreshModel: true },
  };

  async setupController(controller, model) {
    await super.setupController(controller, model);

    const destinationParams = controller.destinations;

    const feed = await this.feedFactory.createFromDestinationNames(
      destinationParams
    );

    set(controller, 'feed', feed);
  }

  model(params) {
    return this.store.query('story', params);
  }

  async resetController(controller, isExiting, transition) {
    if (isExiting) {
      await controller.setProperties({
        destinations: [],
        page: 1,
        tag: [],
        title: 'Headlines',
      });
    }
  }

  @action
  willTransition(transition) {
    const feed = get(this, 'controller.feed');

    if (feed.get('isNew')) {
      feed.deleteRecord();
    }
  }
}
