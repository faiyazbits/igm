import Service, { service } from '@ember/service';
import { computed, get, set } from '@ember/object';
// import { filter } from '@ember/object/computed';
import { includes } from 'lodash';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';

export default class DestinationsService extends Service {
  @service store;

  @tracked
  allDestinations = [];

  async fetchDestinationsAndCache() {
    const allDestinations = await this.store.findAll('destination');
    this.allDestinations = allDestinations;
  }

  get products() {
    return this.allDestinations.filter((d) => {
      return d.destinationType === 'product';
    });
  }

  get regions() {
    return this.allDestinations.filter((d) => d.destinationType === 'region');
  }

  get absAssetClasses() {
    return this.allDestinations.filter(
      (d) => d.destinationType === 'abs_asset_class'
    );
  }

  get assetClasses() {
    return this.allDestinations.filter(
      (d) => d.destinationType === 'asset_class'
    );
  }

  get assetTypes() {
    return this.allDestinations.filter(
      (d) => d.destinationType === 'asset_type'
    );
  }

  get countries() {
    return this.allDestinations.filter((d) => d.destinationType === 'country');
  }

  get contentTypes() {
    return this.allDestinations.filter(
      (d) => d.destinationType === 'content_type'
    );
  }

  get subRegions() {
    return this.allDestinations.filter(
      (d) => d.destinationType === 'sub_region'
    );
  }

  get storyDestinations() {
    return this.allDestinations.filter((d) => includes(d.categories, 'story'));
  }

  get validContentTypes() {
    return this.allDestinations.filter((d) => isPresent(d.contentType));
  }

  get regionsAndNotAmerica() {
    return this.allDestinations.filter((destination) => {
      const isRegionDest = destination.destinationType === 'region';
      const isNotAmericas = destination.displayName !== 'AMERICAS';
      return isRegionDest && isNotAmericas;
    });
  }
}
