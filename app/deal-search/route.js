import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';
import { get, set, getProperties, setProperties } from '@ember/object';

export default class DealSearchRoute extends AuthenticatedRoute {
  @service dealOptions;
  @service store;

  setupController(controller, model) {
    this.store.query('country', { issuer: true }).then((countries) => {
      set(controller, 'countries', countries);
    });

    this.store.findAll('industry').then((industries) => {
      set(controller, 'industries', industries);
    });

    this._super(controller, model);

    const savedSearches = this.store.findAll('saved-search');
    savedSearches.then((savedS) => {
      set(controller, 'savedSearches', savedS);
    });

    this.store.findAll('destination').then((allDestinations) => {
      set(controller, 'allDestinations', allDestinations);
      // this.initDestinationSelects(controller, allDestinations);
    });

    /*

    const dealOptionProperties = getProperties(
      this.controller,
      ...get(this, 'dealOptions.dealOptions')
    );

    if (dealOptionProperties.selfLed === 'false') {
      dealOptionProperties.selfLed = false;
    }

    const pendingSearch = get(controller, 'pendingSearch');
    if (pendingSearch === false) {
      set(controller, 'returnFromDealPage', true);
    }

    this.initDealOptionSelects(dealOptionProperties);
    if (dealOptionProperties.fromVolumeReport) {
      Ember.$('#all-fields').collapse('hide');
      this.controller.send('findDeals');
    } */
  }

  initDestinationSelects(controller, allDestinations) {
    const destinationNames = get(controller, 'destinations');
    const destinationsFromParams = allDestinations.filter((dest) => {
      const name = get(dest, 'name');
      return destinationNames.includes(name);
    });

    this.setControllerDestinations(destinationsFromParams);
  }

  setControllerDestinations(destinations) {
    setProperties(this.controller, {
      region: destinations.filterBy('destinationType', 'region'),
    });
  }

  initDealOptionSelects(properties) {
    if (properties.issuerIds) {
      var selectedIssuers = new EmberA();
      properties.issuerIds.forEach((id) => {
        this.store.findRecord('issuer', id).then((issuer) => {
          selectedIssuers.pushObject(issuer);
        });
      });
      setProperties(this.controller, {
        issuersSelection: selectedIssuers,
        issuers: selectedIssuers,
      });
    }

    if (properties.industryIds) {
      var selectedIndustries = new EmberA();
      properties.industryIds.forEach((id) => {
        this.store.findRecord('industry', id).then((industry) => {
          selectedIndustries.pushObject(industry);
        });
      });
      setProperties(this.controller, {
        industriesSelection: selectedIndustries,
      });
    }

    if (properties.industryIdsExclude) {
      var selectedIndustriesExclude = new EmberA();
      properties.industryIdsExclude.forEach((id) => {
        this.store.findRecord('industry', id).then((industry) => {
          selectedIndustriesExclude.pushObject(industry);
        });
      });
      setProperties(this.controller, {
        industriesExcludeSelection: selectedIndustriesExclude,
      });
    }

    if (properties.countryIds) {
      var selectedCountries = new EmberA();
      properties.countryIds.forEach((id) => {
        this.store.findRecord('country', id).then((country) => {
          selectedCountries.pushObject(country);
        });
      });
      setProperties(this.controller, {
        countriesSelection: selectedCountries,
      });
    }

    if (properties.countryIdsExclude) {
      var selectedCountriesExclude = new EmberA();
      properties.countryIdsExclude.forEach((id) => {
        this.store.findRecord('country', id).then((country) => {
          selectedCountriesExclude.pushObject(country);
        });
      });
      setProperties(this.controller, {
        countriesExcludeSelection: selectedCountriesExclude,
      });
    }

    if (properties.bookManagerBankIds) {
      var selectedManagers = new EmberA();
      properties.bookManagerBankIds.forEach((id) => {
        this.store.findRecord('book-manager-bank', id).then((bank) => {
          selectedManagers.pushObject(bank);
        });
      });
      setProperties(this.controller, {
        bookManagerBanksSelection: selectedManagers,
        bookManagerBanks: selectedManagers,
      });
    }

    if (properties.dealOriginatorIds) {
      var selectedOriginators = new EmberA();
      properties.dealOriginatorIds.forEach((id) => {
        this.store.findRecord('deal-originator', id).then((originator) => {
          selectedOriginators.pushObject(originator);
        });
      });
      setProperties(this.controller, {
        dealOriginatorsSelection: selectedOriginators,
        dealOriginators: selectedOriginators,
      });
    }

    setProperties(this.controller, {
      couponGte: properties.couponGte,
      couponLte: properties.couponLte,
      dateOfferedGte: properties.dateOfferedGte,
      dateOfferedLte: properties.dateOfferedLte,
      dealIdentifier: properties.dealIdentifier,
      distributionStatistics: properties.distributionStatistics,
      maturityGte: properties.maturityGte,
      maturityLte: properties.maturityLte,
      term: properties.term,
      termExclude: properties.termExclude,
      title: properties.title,
      emergingMarket: properties.emergingMarket,
      emergingMarketExclude: properties.emergingMarketExclude,
      fromVolumeReport: properties.fromVolumeReport,
      selfLed: properties.selfLed,
      sfReportType: properties.sfReportType,
    });
    this.updateOptions('couponTypeSelection', properties.couponType);
    this.updateOptions(
      'couponTypeExcludeSelection',
      properties.couponTypeExclude
    );
    this.updateOptions('absAssetClassSelection', properties.absAssetClass);
    this.updateOptions('assetClassSelection', properties.assetClass);
    this.updateOptions('collateralSelection', properties.collateral);
    this.updateOptions('coveredBondsSelection', properties.coveredBonds);
    this.updateOptions(
      'coveredBondsExcludeSelection',
      properties.coveredBondsExclude
    );
    this.updateOptions('currencySelection', properties.currency);
    this.updateOptions('currencyExcludeSelection', properties.currencyExclude);
    this.updateOptions('dealTypeSelection', properties.dealType);
    this.updateOptions('dealTypeExcludeSelection', properties.dealTypeExclude);
    this.updateOptions('fitchRatingSelection', properties.fitchRating);
    this.updateOptions('marketTypeSelection', properties.marketType);
    this.updateOptions(
      'marketTypeExcludeSelection',
      properties.marketTypeExclude
    );
    this.updateOptions('moodysRatingSelection', properties.moodysRating);
    this.updateOptions('ratingSelection', properties.rating);
    this.updateOptions('ratingExcludeSelection', properties.ratingExclude);
    this.updateOptions('spRatingSelection', properties.spRating);
    this.updateOptions('statusSelection', properties.status);
    this.updateOptions(
      'subordinatedHybridPreferredSelection',
      properties.subordinatedHybridPreferred
    );
    this.updateOptions(
      'subordinatedHybridPreferredExcludeSelection',
      properties.subordinatedHybridPreferredExclude
    );
  }

  updateOptions(name, values) {
    const options = get(this.controller, name);
    options.replace(0, options.length, values.slice());
  }

  resetController(controller, isExiting, transition) {}
}
