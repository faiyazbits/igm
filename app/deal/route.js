import { action } from '@ember/object';
import AuthenticatedRoute from '../authenticated/route';
import { service } from '@ember/service';

export default class DealRoute extends AuthenticatedRoute {
  @service feedFactory;
  @service store;

  async model(params) {
    let deal = await this.store.findRecord('deal', params.deal_id, {
      reload: true,
    });
    let relatedStories = await deal.relatedStories;
    let destinations = await deal.destinations;
    let alertFeed = await this.feedFactory.createFromDestinations(
      destinations,
      {
        contentType: 'Deal',
        onDashboard: false,
      }
    );
    return {
      deal: deal,
      relatedStories: relatedStories,
      alertFeed: alertFeed,
    };
  }

  setupController(controller, model) {
    this._super(controller, model);

    controller.deal = model.deal;
    controller.relatedStories = model.relatedStories;
    controller.alertFeed = model.alertFeed;
  }

  @action
  willTransition(transition) {
    const alertFeed = this.controller.alertFeed;
    if (alertFeed.get('isNew')) {
      alertFeed.deleteRecord();
    }
  }
}
