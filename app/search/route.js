import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';
import { action } from '@ember/object';

export default class SearchRoute extends AuthenticatedRoute {
  @service dealOptions;
  @service store;

  async setupController(controller, model) {
    super.setupController(controller, model);

    const savedSearches = await this.store.findAll('saved-search');
    controller.set('savedSearches', savedSearches);
  }

  @action
  queryParamsDidChange() {
    if (this.get('controller.searchQueryComponentRef')) {
      this.controller.searchQueryComponentRef.updateSearchQuery();
    }
  }
}
