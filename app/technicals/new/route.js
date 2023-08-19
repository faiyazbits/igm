import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class TechnicalsNewRoute extends AuthenticatedRoute {
  @service store;
  @service router;

  setupController(controller, model) {
    super.setupController(controller, model);
    set(controller, 'allDestinations', this.store.peekAll('destination'));
  }

  beforeModel(params) {
    super.beforeModel(params);
    return this.store.findAll('destination');
  }

  model() {
    return this.store.createRecord('technical');
  }

  deactivate() {
    this._super();
    var model = this.get('controller.model');
    // Model wasn't saved so whack it!
    if (model.get('isNew')) {
      model.destroyRecord();
    }
  }
}
