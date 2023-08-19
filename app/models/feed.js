import Model, { attr, hasMany, belongsTo } from '@ember-data/model';
import { equal, filterBy, mapBy } from '@ember/object/computed';
import { service } from '@ember/service';
import DashboardableMixin from '../mixins/dashboardable';
import AlertableMixin from '../mixins/alertable';

export default class FeedModel extends Model.extend(
  DashboardableMixin,
  AlertableMixin
) {
  @service session;
  @hasMany('destination', { async: true, inverse: null }) destinations;
  @hasMany('destination', { async: true, inverse: null }) andDestinations;
  @hasMany('destination', { async: true, inverse: null }) orDestinations;
  @hasMany('search-result', { async: false, embedded: 'always', inverse: null })
  searchResults;
  @belongsTo('alert', { async: true, inverse: null })
  alert;
  @attr('string', { defaultValue: 'All' }) contentType;
  @attr('boolean', { defaultValue: true }) onDashboard;
  @attr('number') searchQueryId;
  @attr('string') title;
  @attr('number') totalPages;
  @attr({
    defaultValue: () => ({}),
  })
  position;

  get isAll() {
    return this.contentType == 'All';
  }

  get isDeal() {
    return this.contentType == 'Deal';
  }

  get isStory() {
    return this.contentType == 'Story';
  }

  get isTechnical() {
    return this.contentType == 'Technical';
  }

  get isLeagueTable() {
    return this.contentType == 'LeagueTable';
  }

  get isTechComposite() {
    return this.destinations.then(
      (destinations) =>
        destinations.filter((d) => d.name == 'tech composite').length != 0
    );
  }

  get destinationNames() {
    return this.destinations.then((destinations) =>
      destinations.map((d) => d.name)
    );
  }

  get route() {
    return this.session.currentUser.then((user) => {
      return user.canAuthor ? 'deals.edit' : 'deal';
    });
  }

  get status() {
    const destinationNames = this.destinationNames;

    return destinationNames.then((names) => {
      if (names.includes('priced')) {
        return 'priced';
      } else if (names.includes('pipeline')) {
        return 'pipeline';
      }
    });
  }

  get dealType() {
    const destinationNames = this.destinationNames;
    return destinationNames.then((names) => {
      if (names.includes('em')) {
        return 'em';
      } else if (names.includes('hy')) {
        return 'hy';
      } else if (names.includes('ig')) {
        return 'ig';
      } else if (names.includes('sf')) {
        return 'sf';
      }
    });
  }
}
