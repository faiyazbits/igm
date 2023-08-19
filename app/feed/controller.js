import Controller from '@ember/controller';
import { service } from '@ember/service';
import ENV from 'igm-upgrade/config/environment';

export default class FeedController extends Controller {
  @service session;
  queryParams = ['fullscreen'];
  fullscreen = false;

  get isRealtimeFeedsEnabled() {
    return ENV.featureFlags['realtime-feeds'];
  }

  get feed() {
    return this.model;
  }
}
