import AuthenticatedRoute from '../../authenticated/route';
import { action, get } from '@ember/object';
import { service } from '@ember/service';

export default class BanksNewRoute extends AuthenticatedRoute {
  @service store;

  model() {
    return this.store.createRecord('bank');
  }

  @action
  willTransition(transition) {
    super.willTransition(transition);

    const model = get(this, 'controller.model');

    if (model.isNew) {
      model.deleteRecord();
    }
  }
}
