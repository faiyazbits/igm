import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { action, get } from '@ember/object';
import {
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
} from '@ember-data/adapter/error';

export default class ApplicationRoute extends Route {
  @service session;
  @service router;
  @service fayeClient;
  @service destinations;
  @service notify;

  async beforeModel(transition) {
    await this.session.setup();
  }

  async afterModel() {
    if (this.session.isAuthenticated) {
      await this.destinations.fetchDestinationsAndCache();
      this._subscribeFaye();
    }
  }
  _subscribeFaye() {
    const token = get(this, 'session.data.authenticated.access_token');
    this.fayeClient.setupAuthentication(token);
  }

  @action error(error, transition) {
    if (error instanceof UnauthorizedError) {
      this.notify.alert(' Unauthorized access!');
      this.router.transitionTo('login');
      return;
    }

    if (error instanceof ForbiddenError) {
      this.notify.alert('That request is Forbidden!');
      this.router.transitionTo('my-igm');
      return;
    }

    if (error instanceof NotFoundError) {
      this.notify.alert('That page could not be found!');
      this.router.transitionTo('my-igm');
      return;
    }
  }
}
