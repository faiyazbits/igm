import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class DealOriginatorsEditRoute extends AuthenticatedRoute {
  @service store;

  async model(params) {
    const [dealOriginator, dealOriginators] = await Promise.all([
      this.store.findRecord('dealOriginator', params.deal_originator_id),
      this.store.query('dealOriginator', { show_all: true }),
    ]);

    return { dealOriginator, dealOriginators };
  }

  setupController(controller, model) {
    super.setupController(controller, model);
  }

  @action
  willTransition() {
    const model = get(this, 'controller.dealOriginator');

    if (model.isNew) {
      model.deleteRecord();
    }
  }
}
