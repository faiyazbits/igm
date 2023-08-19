import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class TechnicalsNewRoute extends AuthenticatedRoute {
  @service store;
  @service router;

  queryParams = {
    page: { refreshModel: false },
    per: { refreshModel: true },
  };

  setupController(controller, model) {
    super.setupController(controller, model);
    set(controller, 'newCommentaryHeadline', null);
    set(controller, 'newCommentaryBody', null);
    set(controller, 'destinations', this.store.peekAll('destination'));
  }

  async beforeModel(params) {
    super.beforeModel(params);
    const user = await get(this, 'session.currentUser');
    if (user.get('isClient')) {
      const techId = params.params['technicals.edit'].technical_id;
      this.router.transitionTo('technicals.show', techId);
    } else {
      return this.store.findAll('destination');
    }
  }

  deactivate() {
    this._super();
    var model = this.get('controller.model');
    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }
  }
}
