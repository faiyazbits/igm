import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';

export default class DealsIndexRoute extends AuthenticatedRoute {
  @service store;

  queryParams = {
    destinations: { refreshModel: true },
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  model(params) {
    return this.store.query('deal', params);
  }

  async resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.setProperties({
        page: 1,
        destinations: [],
        title: null,
      });
    }
  }
}
