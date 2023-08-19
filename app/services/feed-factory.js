import { get } from '@ember/object';
import Service, { service } from '@ember/service';
import { includes } from 'lodash';
import { Promise } from 'rsvp';
import { filter, filterBy } from '@ember/object/computed';

export default class FeedFactoryService extends Service {
  @service destinations;
  @service store;

  async createFromDestinationNames(destinationNames, options = {}) {
    const destinationsService = this.destinations;

    const allDestinations = await destinationsService.allDestinations;

    const destinations = allDestinations.filter((destination) => {
      return includes(destinationNames, destination.name);
    });

    return this.createFromDestinations(destinations, options);
  }

  async createFromDestinations(destinations, options = {}) {
    const feed = await this.store.createRecord('feed', options);
    const incomingDestinations = await destinations;
    feed.andDestinations = incomingDestinations;
    return feed;
  }
}
