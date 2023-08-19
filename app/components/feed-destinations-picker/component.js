import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { merge, flatten } from 'lodash';
import Sifter from 'sifter';

export default class FeedDestinationsPickerComponent extends Component {
  @service destinations;
  @tracked existing;

  unallowedDestinationNames = ['tech analysis', 'tech composite'];

  destinationTypes = [
    'assetClasses',
    'assetTypes',
    'contentTypes',
    'countries',
    'products',
    'regions',
    'subRegions',
  ];

  get selectedDestinations() {
    if (this.args.destinationType === 'and') {
      return this.args.feed.andDestinations;
    } else if (this.args.destinationType === 'or') {
      return this.args.feed.orDestinations;
    }
  }

  set selectedDestinations(value) {}

  get assetClasses() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'asset_class'
    );
  }

  get assetTypes() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'asset_type'
    );
  }

  get contentTypes() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'content_type'
    );
  }

  get countries() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'country'
    );
  }

  get products() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'product'
    );
  }

  get regions() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'region'
    );
  }

  get subRegions() {
    return this.selectedDestinations.filter(
      (d) => d.destinationType === 'sub_region'
    );
  }

  get feedContentTypes() {
    return this.destinations.validContentTypes.filter(
      (d) => !this.unallowedDestinationNames.includes(d.name)
    );
  }

  get feedAssetTypes() {
    return this.destinations.assetTypes.filter(
      (d) => !(d.categories.length === '1' && d.categories[0] === 'technical')
    );
  }

  @action
  async onDestinationChange(type, selection) {
    let destinations = this.buildSelectedDestinations(type, selection);
    this.selectedDestinations = this.existing;

    if (this.args.destinationType === 'and') {
      this.args.feed.andDestinations = destinations;
    }
    if (this.args.destinationType === 'or') {
      this.args.feed.orDestinations = destinations;
    }
  }

  buildSelectedDestinations(type, selection) {
    let otherdestinations = this.destinationTypes
      .filter((t) => t != type)
      .map((t) => this[t]);

    let alldestinationsCombined = otherdestinations.concat(selection);
    return flatten(alldestinationsCombined);
  }

  @action
  searchContentType(query) {
    let rawContentType = this.feedContentTypes.slice();
    let sifter = new Sifter(rawContentType);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => this.feedContentTypes.at(score.id));
    return opts;
  }

  @action
  searchProduct(query) {
    let rawProduct = this.destinations.products.slice();
    let sifter = new Sifter(rawProduct);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.destinations.products.at(score.id)
    );
    return opts;
  }

  @action
  searchRegions(query) {
    let rawRegions = this.destinations.regions.slice();
    let sifter = new Sifter(rawRegions);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.destinations.regions.at(score.id)
    );
    return opts;
  }

  @action
  searchAssetClasses(query) {
    let rawAssetClasses = this.destinations.assetClasses.slice();
    let sifter = new Sifter(rawAssetClasses);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.destinations.assetClasses.at(score.id)
    );
    return opts;
  }

  @action
  searchCountries(query) {
    let rawCountries = this.destinations.countries.slice();
    let sifter = new Sifter(rawCountries);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.destinations.countries.at(score.id)
    );
    return opts;
  }
}
