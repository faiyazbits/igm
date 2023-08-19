import AuthenticatedRoute from '../authenticated/route';
import { service } from '@ember/service';
import { set } from '@ember/object';

export default class SavedSearchRoute extends AuthenticatedRoute {
  @service store;

  model(params) {
    return this.store.findRecord('savedSearch', params.saved_search_id);
  }
}
