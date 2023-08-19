import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';
import { get } from '@ember/object';

export default class TechnicalsIndexRoute extends AuthenticatedRoute {
  @service store;
  @service router;

  queryParams = {
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  model(params) {
    return this.store.query('technical', params);
  }

  afterModel(technicals, transition) {
    if (get(technicals, 'length') === 1) {
      this.router.transitionTo('technicals.show', technicals[0]);
    }
  }
}
