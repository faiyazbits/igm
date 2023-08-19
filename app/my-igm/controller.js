import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { sortBy } from 'lodash';

export default class MyIgmController extends Controller {
  @service session;
  @service store;
  @service router;
  showDashboardNotice = false;

  get dashboardItems() {
    let sorted = sortBy(this.model, 'sortOrder');
    return sorted;
  }

  @action
  async logout() {
    this.session.invalidate();
  }

  @action
  goToSavedSearch(queryParams) {
    this.router.transitionTo('search', { queryParams });
  }

  @action
  goToSavedDealSearch(queryParams) {
    this.router.transitionTo('deal-search', { queryParams });
  }

  @action
  async hideNotice() {
    const currentUserId = this.session.currentUser.get('id');
    const store = this.store;

    const user = await store.findRecord('user', currentUserId);
    if (user.hasVisitedDashboard === false) {
      set(user, 'hasVisitedDashboard', true);
      user.save();
    }

    set(this, 'showDashboardNotice', false);
  }

  @action
  showNotice() {
    set(this, 'showDashboardNotice', true);
  }
}
