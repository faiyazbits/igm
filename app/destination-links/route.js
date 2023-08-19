import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
// import AuthenticatedRoute from '../../authenticated/route';
import { set } from '@ember/object';

export default class DestinationLinksRoute extends Route {
  queryParams = {
    destinations: { refreshModel: true },
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  @service store;

  model(params) {
    return this.store.query('destination-link', params);
  }

  resetController(controller, isExiting, transition) {
    if (isExiting) {
      controller.set('page', 1);
    }
  }

  @action
  queryParamsDidChange(changed, totalPresent, removed) {
    const controller = this.controllerFor('destination-links');
    if (isPresent(changed.destinations)) {
      // controller.set('page', 1);
      controller.set('page', 1);
    }
    this._super(changed, totalPresent, removed);
    this.refresh();
  }
}
