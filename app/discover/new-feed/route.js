import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action, get } from '@ember/object';
import AuthenticatedRoute from '../../authenticated/route';

export default class NewFeedRoute extends AuthenticatedRoute {

  @service store;
  @service router;

  model() {
    return this.store.createRecord('feed');
  }

  @action
  willTransition() {
    const model = this.model;

    if (get(model, 'isNew')) {
      model.deleteRecord();
    }
  }

}
