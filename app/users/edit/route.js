import AuthenticatedRoute from '../../authenticated/route';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class UsersEditRoute extends AuthenticatedRoute {
  @service store;

  async model(params) {
    return await this.store.findRecord('user', params.user_id);
  }

  @action
  willTransition(transition) {
    const model = this.model;
    if (model.hasDirtyAttributes) {
      model.rollbackAttributes();
    }
  }
  
}
