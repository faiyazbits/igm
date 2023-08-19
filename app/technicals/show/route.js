import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class TechnicalsShowRoute extends AuthenticatedRoute {
  @service store;
  @service router;
  @service feedFactory;

  queryParams = {
    page: { refreshModel: false },
    per: { refreshModel: true }
  }

  async setupController(controller, model) {
    super.setupController(controller, model);
    const andDestinations = await get(model, 'destinations')
    const andDestinationNames = andDestinations.mapBy('name');
    const feedFactory = this.feedFactory;

    const feed = await feedFactory.createFromDestinationNames(andDestinationNames, {
      contentType: 'Technical',
      onDashboard: true
    });
    
    set(controller, 'feed', feed);
  };
}
