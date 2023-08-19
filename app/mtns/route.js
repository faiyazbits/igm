import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';

export default class MtnsRoute extends AuthenticatedRoute {
  @service store;

  queryParams = {
    destinations: { refreshModel: true },
    period: { refreshModel: true },
    page: { refreshModel: true },
    per: { refreshModel: true }
  }

  model(params) {
    return this.store.query('mtn', params);
  }

  async resetController(controller, isExiting, transition) {
    if (isExiting) {
      await controller.setProperties({
        page: 1,
        destinations: null,
        title: null
      });
    }
  }

}
