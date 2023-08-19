import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class DealsEditRoute extends AuthenticatedRoute {
  @service store;
  @service router;
  @service feedFactory;

  beforeModel(params) {
    super.beforeModel(params);
    return get(this, 'session.currentUser').then((user) => {
      if (user.get('isClient')) {
        const dealId = params.params['deals.edit'].id;
        this.router.transitionTo('deal', dealId);
      }
    });
  }

  model(params) {
    return this.store.findRecord('deal', params.id, { reload: true });
  }

  async setupController(controller, model) {
    super.setupController(controller, model);

    const feedFactory = this.feedFactory;

    const allDestinations = await this.store.query('destination', {});
    set(controller, 'allDestinations', allDestinations);
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

    if (alertFeed.get('isNew')) {
      alertFeed.deleteRecord();
    }

    const modelClass = this.store.modelFor('deal');

    modelClass.eachRelationship((name, descriptor) => {
      let relatedModels = this.store.peekAll(descriptor.type);

      relatedModels.forEach((relatedModel) => {
        relatedModel.rollbackAttributes();
      });
    });
  }
}
