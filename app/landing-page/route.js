import AuthenticatedRoute from '../authenticated/route';
import { service } from '@ember/service';

export default class LandingPageRoute extends AuthenticatedRoute {

  @service store;
    beforeModel() {
    //  super.beforeModel();
    return this.store.findAll('destination');
  }
}
