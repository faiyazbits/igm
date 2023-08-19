import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';

export default class DiscoverPageRoute extends AuthenticatedRoute {
  @service store;

  async model({ slug }) {
    let dashboard = await this.store.queryRecord('dashboard', { slug });
    let dashboardItems = await dashboard.dashboardItems;
    return { dashboardItems };
  }

  resetController(isExiting) {
    if (isExiting) {
      this.store.unloadAll('dashboard-item');
    }
  }
}
