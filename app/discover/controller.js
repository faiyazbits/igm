import Controller from '@ember/controller';
import ENV from 'igm-upgrade/config/environment';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';

export default class DiscoverController extends Controller {
  @service session;

  @service session;

  get isRealtimeFeedsEnabled() {
    return ENV.featureFlags['realtime-feeds'];
  }

  get hasCredit() {
    return this.session.currentUser.then((user) => user.hasCredit);
  }

  get hasIIIA() {
    return this.session.currentUser.then((user) => user.hasIIIA);
  }

  get hasRates() {
    return this.session.currentUser.then((user) => user.hasRates);
  }

  get hasFX() {
    return this.session.currentUser.then((user) => user.hasFX);
  }

  get hasG10FxPlaybook() {
    return this.session.currentUser.then((user) => user.hasG10FxPlaybook);
  }

  get hasPremiumCreditReports() {
    return this.session.currentUser.then(
      (user) => user.hasPremiumCreditReports
    );
  }
  get destinationElement() {
    return document.getElementById('destination');
  }
}
