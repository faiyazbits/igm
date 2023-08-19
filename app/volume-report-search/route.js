import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';
import { action, get, getProperties, set, setProperties } from '@ember/object';

export default class VolumeReportSearchRoute extends AuthenticatedRoute {
  @service dealOptions;
  @service store;

  async setupController(controller, model) {
    super.setupController(controller, model);

    const countries = await this.store.query('country', {issuer: true });
    set(controller, 'countries', countries);

    const savedSearches = await this.store.findAll('saved-search');
    set(controller, 'savedSearches', savedSearches);

    const allDestinations = await this.store.findAll('destination');
    set(controller, 'allDestinations', allDestinations);
    this.initDestinationSelects(controller, allDestinations);

    const volumeReportOptionProperties = getProperties(
      this.controller, ...get(this, 'dealOptions.volumeReportOptions')
    );

    this.initVolumeReportOptionSelects(volumeReportOptionProperties);
  }

  initDestinationSelects(controller, allDestinations) {
    const destinationNames = get(controller, 'destinations');
    const destinationsFromParams = allDestinations.filter((dest) => {
      const name = dest.name;
      return destinationNames.includes(name);
    });

    this.setControllerDestinations(destinationsFromParams);
  }

  setControllerDestinations(destinations) {
    setProperties(this.controller, {
      region: destinations.filter((d) => d.destinationType == 'region')
    });
  }

  initVolumeReportOptionSelects(properties) {
    if (properties.issuerIds) {

      var selectedIssuers = [];
      properties.issuerIds.forEach((id) => {
        this.store.findRecord('issuer', id).then((issuer) => {
          selectedIssuers.pushObject(issuer);
        });
      });

      setProperties(this.controller, {
        issuersSelection: selectedIssuers,
        issuers: selectedIssuers
      });
    }

    if (properties.industryIds) {
      var selectedIndustries = [];
      properties.industryIds.forEach((id) => {
        this.store.findRecord('industry', id).then((industry) => {
          selectedIndustries.pushObject(industry);
        });
      });
      setProperties(this.controller, {
        industriesSelection: selectedIndustries,
        industries: selectedIndustries
      });
    }

    if (properties.industryIdsExclude) {
      var selectedIndustriesExclude = [];
      properties.industryIdsExclude.forEach((id) => {
        this.store.findRecord('industry', id).then((industry) => {
          selectedIndustriesExclude.pushObject(industry);
        });
      });
      setProperties(this.controller, {
        industriesExcludeSelection: selectedIndustriesExclude,
        industriesExclude: selectedIndustriesExclude
      });
    }

    if (properties.countryIds) {
      var selectedCountries = [];
      properties.countryIds.forEach((id) => {
        this.store.findRecord('country', id).then((country) => {
          selectedCountries.pushObject(country);
        });
      });
      setProperties(this.controller, {
        countriesSelection: selectedCountries,
        countries: selectedCountries
      });
    }

    if (properties.countryIdsExclude) {
      var selectedCountriesExclude = [];
      properties.countryIdsExclude.forEach((id) => {
        this.store.findRecord('country', id).then((country) => {
          selectedCountriesExclude.pushObject(country);
        });
      });
      setProperties(this.controller, {
        countriesExcludeSelection: selectedCountriesExclude,
        countriesExclude: selectedCountriesExclude
      });
    }

    if (properties.bookManagerBankIds) {
      var selectedManagers = [];
      properties.bookManagerBankIds.forEach((id) => {
        this.store.findRecord('book-manager-bank', id).then((bank) => {
          selectedManagers.pushObject(bank);
        });
      });
      setProperties(this.controller, {
        bookManagerBanksSelection: selectedManagers,
        bookManagerBanks: selectedManagers
      });
    }

    setProperties(this.controller, {
      couponGte: properties.couponGte,
      couponLte: properties.couponLte,
      currency: properties.currency,
      displayCurrency: properties.displayCurrency,
      dateOfferedGte: properties.dateOfferedGte,
      dateOfferedLte: properties.dateOfferedLte,
      dealIdentifier: properties.dealIdentifier,
      emergingMarket: properties.emergingMarket,
      emergingMarketExclude: properties.emergingMarketExclude,
      industryTable: properties.industryTable,
      maturityGte: properties.maturityGte,
      maturityLte: properties.maturityLte,
      period: properties.period,
      selfLed: properties.selfLed,
      sfReportCategory: properties.sfReportCategory,
      sfReportType: properties.sfReportType,
      term: properties.term,
      termExclude: properties.termExclude,
      title: properties.title,
    });

    this.updateOptions('couponTypeSelection', properties.couponType);
    this.updateOptions('formatSelection', properties.format);
    this.updateOptions('esgSriDealTypeSelection', properties.esgSriDealType);
    this.updateOptions('couponTypeExcludeSelection', properties.couponTypeExclude);
    this.updateOptions('coveredBondsSelection', properties.coveredBonds);
    this.updateOptions('coveredBondsExcludeSelection', properties.coveredBondsExclude);
    this.updateOptions('dealTypeSelection', properties.dealType);
    this.updateOptions('dealTypeExcludeSelection', properties.dealTypeExclude);
    this.updateOptions('fitchRatingSelection', properties.fitchRating);
    this.updateOptions('marketTypeSelection', properties.marketType);
    this.updateOptions('marketTypeSelection', properties.marketType);
    this.updateOptions('marketTypeExcludeSelection', properties.marketTypeExclude);
    this.updateOptions('moodysRatingSelection', properties.moodysRating);
    this.updateOptions('ratingSelection', properties.rating);
    this.updateOptions('ratingExcludeSelection', properties.ratingExclude);
    this.updateOptions('spRatingSelection', properties.spRating);
    this.updateOptions('subordinatedHybridPreferredSelection', properties.subordinatedHybridPreferred);
    this.updateOptions('subordinatedHybridPreferredExcludeSelection', properties.subordinatedHybridPreferredExclude);
  }

  updateOptions(name, values) {
    const options = get(this.controller, name);
    options.replace(0, options.length, values.slice());
  }
}
