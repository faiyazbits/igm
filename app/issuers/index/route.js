import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class IssuersIndexRoute extends AuthenticatedRoute {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  model(params) {
    return this.store.query('issuer', params);
  }

  async setupController(controller, model) {
    await super.setupController(controller, model);
    set(controller, 'totalPages', model.get('meta.total_pages'));
  }
}
