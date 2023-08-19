import AuthenticatedRoute from '../../authenticated/route';
import { get, set } from '@ember/object';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default class CalendarEventsIndexRoute extends AuthenticatedRoute {
  @service store;

  queryParams = {
    countryIds: { refreshModel: true },
    eventType: { refreshModel: true },
    regionIds: { refreshModel: true },
  };

  async model(params) {
    const calendarEvent = await this.store.query('calendarEvent', {
      country_ids: params.countryIds,
      event_type: params.eventType,
      region_ids: params.regionIds,
    });

    return calendarEvent;
  }

  async setupController(controller, model) {
    super.setupController(controller, model);

    const store = this.store;

    const countries = await store.findAll('country');
    set(controller, 'allCountries', countries);
    this.preloadCountriesToFilterByForController(controller);
    
    const regions = await store.findAll('region');
    set(controller, 'allRegions', regions);
    this.preloadRegionsToFilterByForController(controller);
  }

  async preloadCountriesToFilterByForController(controller) {
    const countryIds = get(controller, 'countryIds');
    const hasCountryParams = isPresent(countryIds);
    const store = this.store;

    if (hasCountryParams) {
      const selectedCountries = await store.peekAll('country').filter((country) => {
        return countryIds.includes(country.id);
      });

      set(controller, 'countriesToFilterBy', selectedCountries);
    } else {
      set(controller, 'countriesToFilterBy', []);
    }
  }

  async preloadRegionsToFilterByForController(controller) {
    const regionIds = get(controller, 'regionIds');
    const hasRegionParams = isPresent(regionIds);
    const store = this.store;

    if (hasRegionParams) {
      const selectedRegions = await store.peekAll('region').filter((region) => {
        return regionIds.includes(region.id);
      });

      set(controller, 'regionsToFilterBy', selectedRegions);
    } else {
      set(controller, 'regionsToFilterBy', []);
    }
  }
}
