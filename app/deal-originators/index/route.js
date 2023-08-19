import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';

export default class DealOriginatorsIndexRoute extends AuthenticatedRoute {
  @service store;
  queryParams = {
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  model(params) {
    return this.store.query('dealOriginator', params);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    controller.set('totalPages', model.get('meta.total_pages'));
  }
}
