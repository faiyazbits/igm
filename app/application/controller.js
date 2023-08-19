import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';

export default class ApplicationController extends Controller {
  @service session;
  @service router;
  @service store;
  @service fayeClient;

  @tracked
  showCookiePolicy = false;

  get canShowMainOutlet() {
    return this.session.isAuthenticated && this.notLoading;
  }

  get classesForCurrentRoute() {
    let currentRoute = this.router.currentRoute || { name: 'application' };
    let routeName = currentRoute.name;
    let className = routeName.replace(/\./g, '-') + '-route';
    return className;
  }

  get topStyle() {
    if (this.showCookiePolicy) {
      return htmlSafe('');
    } else {
      return htmlSafe('margin-top: 38px;');
    }
  }
}
