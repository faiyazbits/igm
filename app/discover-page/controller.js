import Controller from '@ember/controller';
import ENV from 'igm-upgrade/config/environment';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { sortBy } from 'lodash';

export default class DiscoverPageController extends Controller {
  get sortedDashboardItems() {
    let dItems = this.model.dashboardItems.slice();
    return sortBy(dItems, 'sortOrder');
  }
}
