import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class DealOriginatorsNewRoute extends AuthenticatedRoute {
  @service store;

  async model() {
    const [dealOriginator, dealOriginators] = await Promise.all([
      this.store.createRecord('dealOriginator'),
      this.store.query('dealOriginator', { show_all: true }),
    ]);

    return { dealOriginator, dealOriginators };
  }

  @action
  willTransition() {
    const model = get(this, 'controller.model');

    if (model.isNew) {
      model.deleteRecord();
    }
  }
}
