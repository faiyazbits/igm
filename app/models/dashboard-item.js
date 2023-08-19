import Model, { attr, belongsTo } from '@ember-data/model';
import { isEmpty } from '@ember/utils';

export default class DashboardItemModel extends Model {
  @belongsTo('dashboard', { async: true, inverse: 'dashboardItems' })
  dashboard;
  @belongsTo('dashboardable', {
    async: true,
    polymorphic: true,
    inverse: null,
  })
  dashboardable;
  @belongsTo('user', { inverse: 'dashboardItems', async: true }) user;

  @attr('number') dashboardableId;
  @attr('string') dashboardableType;
  @attr('number') sortOrder;
  @attr('number') sortOrderPosition;

  get hasDealContentType() {
    return this.dashboardable.then((d) => d.contentType == 'Deal');
  }

  get hasDealIdentifier() {
    return this.dashboardable.then((d) => !isEmpty(d.dealIdentifier));
  }

  get isDealFeed() {
    return this.hasDealContentType.then(
      (hasDealContentType) => hasDealContentType && this.isFeed
    );
  }

  get isFeed() {
    return this.dashboardableType == 'Feed';
  }

  get isSavedSearch() {
    return this.dashboardableType == 'SavedSearch';
  }

  get isTechnicalFeed() {
    return this.dashboardable.then((d) => d.contentType == 'Technical');
  }

  get isTechCompositeFeed() {
    return this.dashboardable.then(
      (d) => d.contentType == 'TechnicalComposite'
    );
  }

  get isLeagueTable() {
    return this.dashboardable.then((d) => d.contentType == 'LeagueTable');
  }

  get isDealSearch() {
    return this.hasDealIdentifier.then(
      (hasDealIdentifier) => hasDealIdentifier && this.isSavedSearch
    );
  }

  get isLeagueTableFeed() {
    return this.isLeagueTable.then(
      (isLeagueTable) => isLeagueTable && this.isFeed
    );
  }
}
