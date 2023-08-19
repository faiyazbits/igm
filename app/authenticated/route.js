import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class AuthenticatedRoute extends Route {
  @service session;
  @service destinations;
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async afterModel() {
    if (this.session.isAuthenticated) {
      await this.destinations.fetchDestinationsAndCache();
    }
  }
}
