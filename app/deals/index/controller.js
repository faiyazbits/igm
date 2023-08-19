import Controller from '@ember/controller';
import { computed, get } from '@ember/object';
import { service } from '@ember/service';
import { alias } from '@ember/object/computed';

export default class DealsIndexController extends Controller {
  queryParams = ['destinations', 'title'];
  destinations = [];
  title = null;
  page = 1;
  per = 20;

  @service session;

  @computed('session.currentUser.canAuthor')
  get route() {
    const canAuthor = get(this, 'session.currentUser.canAuthor');
    return canAuthor ? 'deals.edit' : 'deal';
  }

  @computed('destinations')
  get status() {
    const destinations = this.destinations;

    if (destinations.includes('priced')) {
      return 'priced';
    } else if (destinations.includes('pipeline')) {
      return 'pipeline';
    }
  }

  @computed('destinations')
  get dealType() {
    const destinations = this.destinations;

    if (destinations.includes('em')) {
      return 'em';
    } else if (destinations.includes('hy')) {
      return 'hy';
    } else if (destinations.includes('ig')) {
      return 'ig';
    } else if (destinations.includes('sf')) {
      return 'sf';
    }
  }

  @computed('status', 'dealType')
  get isValidDestinationParams() {
    const validStatuses = ['pipeline', 'priced'];
    const validDealTypes = ['em', 'hy', 'ig', 'sf'];
    const status = this.status;
    const dealType = this.dealType;

    return validStatuses.includes(status) && validDealTypes.includes(dealType);
  }

  @alias('model.meta.total_pages')
  totalPages;
}
