import { action, get, set } from '@ember/object';
import { service } from '@ember/service';
import AuthenticatedRoute from '../../authenticated/route';

export default class DealsNewRoute extends AuthenticatedRoute {
  @service store;
  @service feedFactory;

  queryParams = {
    dealIdentifier: {
      refreshModel: true,
      replace: true,
    },
  };

  model(params) {
    const dealIdentifier = params.dealIdentifier || 'corporate';
    return this.store.createRecord('deal', { dealIdentifier: dealIdentifier });
  }

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      set(controller, 'dealIdentifier', null);
    }
  }

  async setupController(controller, model) {
    super.setupController(controller, model);
    const relatedStories = await model.relatedStories;
    set(controller, 'relatedStories', relatedStories);
    const destinations = await model.destinations;
    const alertFeed = await this.feedFactory.createFromDestinations(
      destinations,
      {
        contentType: 'Deal',
        onDashboard: false,
      }
    );

    set(controller, 'alertFeed', alertFeed);
  }

  @action
  willTransition(transition) {
    const alertFeed = get(this, 'controller.alertFeed');
    const model = get(this, 'controller.model');

    if (model.isNew) {
      model.deleteRecord();
    }

    if (alertFeed.get('isNew')) {
      alertFeed.deleteRecord();
    }
  }
}
