import { action, get, set } from '@ember/object';
import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';

export default class TechnicalCompositesRoute extends AuthenticatedRoute {
  @service router;
  @service store;

  model(params) {
    return this.store.query('technical-composite', params);
  }

  afterModel(technicalComposites, transition) {
    this.router.transitionTo('technical-composite', technicalComposites[0]);
  }
}
