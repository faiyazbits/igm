import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { groupBy } from 'lodash';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import Sifter from 'sifter';

export default class CalendarEventsIndexController extends Controller {
  @alias('model')
  calendarEvents;
  @service() session;
  queryParams = ['countryIds', 'eventType', 'regionIds'];
  @tracked countriesToFilterBy = [];
  @tracked countryIds = [];
  @tracked eventType = null;
  @tracked regionIds = [];
  @tracked regionsToFilterBy = [];

  get calendarEventGroups() {
    let calendarEventGroups = [];
    let grouped = groupBy(this.calendarEvents, 'day');
    for (let g in grouped) {
      calendarEventGroups.push({
        value: g,
        items: grouped[g],
      });
    }
    return calendarEventGroups;
  }

  @action
  setEventType(type) {
    this.eventType = type == '' ? null : type;
  }

  @action
  searchCountry(query) {
    let allCountries = this.allCountries.slice();
    let sifter = new Sifter(allCountries);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => allCountries.at(score.id));
    return opts;
  }

  @action
  searchGeography(query) {
    let allRegions = this.allRegions.slice();
    let sifter = new Sifter(allRegions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => allRegions.at(score.id));
    return opts;
  }

  @action
  onCountriesToFilterByChange(selectedCountry) {
    this.countriesToFilterBy = selectedCountry;

    var countryCodes = this.countriesToFilterBy.map(function (country) {
      return country.id;
    });

    this.countryIds = countryCodes;
  }

  @action
  onRegionsToFilterByChange(selectedRegion) {
    this.regionsToFilterBy = selectedRegion;

    var regionIds = this.regionsToFilterBy.map(function (region) {
      return region.id;
    });

    this.regionIds = regionIds;
  }
}
