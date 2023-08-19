import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class IssuersNewRoute extends AuthenticatedRoute {
  @service store;

  async model(params) {
    const [issuer, issuers] = await Promise.all([
      this.store.createRecord('issuer'),
      this.store.query('issuer', params),
    ]);

    return { issuer, issuers };
  }

  async setupController(controller, model) {
    await super.setupController(controller, model);

    this.store.findAll('country').then((countries) => {
      set(model, 'allCountries', countries);
    });

    this.store.findAll('industry').then((industries) => {
      set(model, 'allIndustries', industries);
    });
  }

  @action
  willTransition() {
    const model = get(this, 'controller.model');

    if (model.isNew) {
      model.deleteRecord();
    }
  }
}
