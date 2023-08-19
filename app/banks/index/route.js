import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';

export default class BanksIndexRoute extends AuthenticatedRoute {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  model(params) {
    return this.store.query('bank', params);
  }
}
