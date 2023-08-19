import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import { service } from '@ember/service';

export default class IssuersEditRoute extends AuthenticatedRoute {
  @service store;

  async model(params) {
    const [issuer, issuers] = await Promise.all([
      this.store.findRecord('issuer', params.issuer_id),
      this.store.query('issuer', params),
    ]);

    return { issuer, issuers };
  }

  async setupController(controller, model) {
    super.setupController(controller, model);
    const nickname = model.issuer.nickname;

    if (nickname === 'NULL') {
      set(model.issuer, 'nickname', '');
    }

    const countries = await this.store.findAll('country');
    set(model, 'allCountries', countries);

    const industryNames = await this.store.findAll('industry');
    set(model, 'allIndustries', industryNames);
  }

  @action
  willTransition() {
    let model = get(this, 'controller.model');

    if (model.issuer.isNew) {
      model.deleteRecord();
    }
  }
}
