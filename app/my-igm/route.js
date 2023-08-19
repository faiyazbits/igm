import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';

export default class MyIgmRoute extends AuthenticatedRoute {
  @service features;
  @service store;
  @service session;
  @service http;

  async model() {
    if (this.features.isEnabled('realtime-feeds')) {
      let currentUserId = this.session.currentUserId;

      let response = await this.http.fetchData(
        `/api/v1/dashboards?user_id=${currentUserId}`,
        'GET'
      );
      // only one dashboard will be there for a user
      let dashboardId = response['dashboards'][0].id;
      try {
        let result = this.store.pushPayload('dashboard', response);
      } catch (e) {
        console.error(e);
      }

      let dashboardRecord = await this.store.peekRecord(
        'dashboard',
        dashboardId
      );

      let dashboardItems = await dashboardRecord.get('dashboardItems');
      return dashboardItems;
    } else {
      let dashboardItems = await this.store.findAll('dashboard-item');

      return dashboardItems;
    }
  }

  async setupController(controller, model) {
    super.setupController(controller, model);

    const user = await this.session.currentUser;
    if (user.get('hasVisitedDashboard') === false) {
      controller.showDashboardNotice = true;
    }
  }
}
