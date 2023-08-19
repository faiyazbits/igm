import Controller from '@ember/controller';
import { action, set, get, getProperties } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty, isPresent } from '@ember/utils';
import SearchQuery from '../models/search-query';
import Sifter from 'sifter';
import moment from 'moment-timezone';
import { task, timeout } from 'ember-concurrency';

export default class DealSearchController extends Controller {
  @service store;
  @service session;
  @service notify;
  @service router;
  @service dealOptions;

  // ui related
  @tracked
  canExport = false;

  @tracked
  pendingSearch = true;

  @tracked
  showingAdvancedSearch = false;

  @tracked
  returnFromDealPage = false;

  //values set from route setupController
  @tracked
  countries = [];

  @tracked
  industries = [];

  @tracked
  savedSearches = [];

  @tracked
  allDestinations = [];

  queryParams = [
    'absAssetClass',
    'assetClass',
    'bookManagerBankIds',
    'canExport',
    'collateral',
    'contentType',
    'countryIds',
    'countryIdsExclude',
    'couponGte',
    'couponLte',
    'couponType',
    'couponTypeExclude',
    'coveredBonds',
    'coveredBondsExclude',
    'currency',
    'currencyExclude',
    'dateOfferedGte',
    'dateOfferedLte',
    'dealIdentifier',
    'dealOriginatorIds',
    'dealType',
    'dealTypeExclude',
    'destinations',
    'distributionStatistics',
    'emergingMarket',
    'emergingMarketExclude',
    'fitchRating',
    'fromVolumeReport',
    'industryIds',
    'industryIdsExclude',
    'issuerIds',
    'marketType',
    'marketTypeExclude',
    'maturityGte',
    'maturityLte',
    'moodysRating',
    'page',
    'perPage',
    'queryString',
    'rating',
    'format',
    'isin',
    'esgSriDealType',
    'ratingExclude',
    'relatedStories',
    'selfLed',
    'sendInCSV',
    'sendInExcel',
    'sendInXLSX',
    'sfReportType',
    'spRating',
    'status',
    'subordinatedHybridPreferred',
    'subordinatedHybridPreferredExclude',
    'term',
    'termExclude',
    'title',
  ];

  advancedParams = [
    'absAssetClass',
    'assetClass',
    'bookManagerBankIds',
    'collateral',
    'countryIds',
    'countryIdsExclude',
    'couponGte',
    'couponLte',
    'couponType',
    'couponTypeExclude',
    'coveredBonds',
    'coveredBondsExclude',
    'currencyExclude',
    'dealOriginatorIds',
    'dealType',
    'dealTypeExclude',
    'distributionStatistics',
    'emergingMarket',
    'emergingMarketExclude',
    'fitchRating',
    'industryIdsExclude',
    'marketType',
    'marketTypeExclude',
    'maturityGte',
    'maturityLte',
    'moodysRating',
    'rating',
    'format',
    'isin',
    'esgSriDealType',
    'ratingExclude',
    'relatedStories',
    'spRating',
    'subordinatedHybridPreferred',
    'subordinatedHybridPreferredExclude',
    'term',
    'termExclude',
  ];

  defaultParams = {
    dateOfferedGteMoment: moment().utc().startOf('year'),
    dateOfferedLteMoment: moment().utc(),
    dealIdentifier: 'corporate',
    status: ['Priced'],
  };

  uniqueSelectionTitles = {
    bookManagerBankIds: 'bookManagerBanksSelection',
    countryIds: 'countriesSelection',
    countryIdsExclude: 'countriesExcludeSelection',
    dealOriginatorIds: 'dealOriginatorsSelection',
    industryIds: 'industriesSelection',
    industryIdsExclude: 'industriesExcludeSelection',
    issuerIds: 'issuersSelection',
  };

  @tracked
  searchQuery = null;

  @tracked
  queryString = '';

  @tracked
  page = 1;

  @tracked
  perPage = 20;

  @tracked
  relatedStories = false;

  @tracked
  sendInCSV = false;

  @tracked
  sendInExcel = false;

  @tracked
  sendInXLSX = false;

  @tracked
  term = null;

  @tracked
  termExclude = null;

  @tracked
  title = null;

  get hasQuery() {
    return !isEmpty(this.queryString);
  }

  @tracked
  contentType = 'Deal';

  @tracked
  couponGte = null;

  @tracked
  couponLte = null;

  @tracked
  dealIdentifier = 'corporate';

  @tracked
  distributionStatistics = false;

  @tracked
  emergingMarket = false;

  @tracked
  emergingMarketExclude = false;

  @tracked
  fromVolumeReport = false;

  @tracked
  selfLed = null;

  @tracked
  dateOfferedGteMoment = moment().utc().startOf('year');

  get dateOfferedGte() {
    return this._getMomentDate('dateOfferedGte');
  }

  set dateOfferedGte(value) {
    return this._setMomentDate('dateOfferedGte', value);
  }

  @tracked
  dateOfferedLteMoment = moment().utc();

  get dateOfferedLte() {
    return this._getMomentDate('dateOfferedLte');
  }

  set dateOfferedLte(value) {
    return this._setMomentDate('dateOfferedLte', value);
  }

  @tracked
  maturityGteMoment = null;

  get maturityGte() {
    return this._getMomentDate('maturityGte');
  }

  set maturityGte(value) {
    return this._setMomentDate('maturityGte', value);
  }

  @tracked
  maturityLteMoment = null;

  get maturityLte() {
    return this._getMomentDate('maturityLte');
  }

  set maturityLte(value) {
    return this._setMomentDate('maturityLte', value);
  }

  // for selects and datepickers. some are set from controllers also

  @tracked
  absAssetClass = [];

  @tracked
  assetClass = [];

  @tracked
  bookManagerBankIds = [];

  @tracked
  bookManagerBanks = [];

  @tracked
  collateral = [];

  @tracked
  countries = [];

  @tracked
  countriesExclude = [];

  @tracked
  countryIds = [];

  @tracked
  countryIdsExclude = [];

  @tracked
  couponType = [];

  @tracked
  isin = null;

  @tracked
  couponTypeExclude = [];

  @tracked
  coveredBonds = [];

  @tracked
  coveredBondsExclude = [];

  @tracked
  currency = [];

  @tracked
  currencyExclude = [];

  @tracked
  dealOriginatorIds = [];

  @tracked
  dealOriginators = [];

  @tracked
  dealType = [];

  @tracked
  dealTypeExclude = [];

  @tracked
  destinations = [];

  @tracked
  fitchRating = [];

  @tracked
  industries = [];

  @tracked
  industriesExclude = [];

  @tracked
  industryIds = [];

  @tracked
  industryIdsExclude = [];

  @tracked
  issuers = [];

  @tracked
  issuerIds = [];

  @tracked
  marketType = [];

  @tracked
  marketTypeExclude = [];

  @tracked
  moodysRating = [];

  @tracked
  rating = [];

  @tracked
  format = [];

  @tracked
  esgSriDealType = [];

  @tracked
  ratingExclude = [];

  @tracked
  region = [];

  @tracked
  spRating = [];

  @tracked
  status = ['Priced'];

  @tracked
  subordinatedHybridPreferred = [];

  @tracked
  subordinatedHybridPreferredExclude = [];

  @tracked
  absAssetClassSelection = [];

  @tracked
  assetClassSelection = [];

  @tracked
  esgSriDealTypeSelection = [];

  @tracked
  bookManagerBanksSelection = [];

  @tracked
  collateralSelection = [];

  @tracked
  countriesSelection = [];

  @tracked
  countriesExcludeSelection = [];

  @tracked
  couponTypeSelection = [];

  @tracked
  couponTypeExcludeSelection = [];

  @tracked
  coveredBondsSelection = [];

  @tracked
  coveredBondsExcludeSelection = [];

  @tracked
  currencySelection = [];

  @tracked
  currencyExcludeSelection = [];

  @tracked
  dealOriginatorsSelection = [];

  @tracked
  dealTypeSelection = [];

  @tracked
  dealTypeExcludeSelection = [];

  @tracked
  fitchRatingSelection = [];

  @tracked
  industriesSelection = [];

  @tracked
  industriesExcludeSelection = [];

  @tracked
  issuersSelection = [];

  @tracked
  marketTypeSelection = [];

  @tracked
  marketTypeExcludeSelection = [];

  @tracked
  moodysRatingSelection = [];

  @tracked
  ratingSelection = [];

  @tracked
  formatSelection = [];

  @tracked
  ratingExcludeSelection = [];

  @tracked
  spRatingSelection = [];

  @tracked
  statusSelection = ['Priced'];

  @tracked
  subordinatedHybridPreferredSelection = [];

  @tracked
  subordinatedHybridPreferredExcludeSelection = [];

  @task(function* (query) {
    yield timeout(600);
    return this.store
      .query('issuer', { name: query, per: 15 })
      .then((issuer) => {
        let rawIssuer = issuer.toArray();
        let sifter = new Sifter(rawIssuer);
        let results = sifter.search(query, {
          fields: ['name'],
          sort: [{ field: 'name', direction: 'asc' }],
          limit: 15,
        });
        let opts = results.items.map((score) => rawIssuer.at(score.id));
        return opts;
      });
  })
  searchIssuers;

  _getMomentDate(key) {
    const momentAttribute = key + 'Moment';
    const dateMoment = this.get(momentAttribute);
    if (isPresent(dateMoment)) {
      return moment.utc(dateMoment).toJSON();
    } else {
      return null;
    }
  }

  _setMomentDate(key, value) {
    const momentAttribute = key + 'Moment';
    if (isPresent(value)) {
      let newDateMoment = moment.utc(value);
      set(this, momentAttribute, newDateMoment);
      return newDateMoment.toJSON();
    } else {
      return null;
    }
  }

  get savedDealSearches() {
    const sfDeals = get(this, 'savedSearches')
      .filter((ss) => ss.contentType == 'Deal')
      .filter((ss) => ss.dealIdentifier == 'sf');
    const corporateDeals = get(this, 'savedSearches')
      .filter((ss) => ss.contentType == 'Deal')
      .filter((ss) => ss.dealIdentifier == 'corporate');
    $('#all-fields').collapse('show');
    return sfDeals.concat(corporateDeals);
  }

  get regionOptions() {
    return this.allDestinations.filter((d) => {
      const isRegionDest = get(d, 'destinationType') === 'region';
      const isNotAmericas = get(d, 'displayName') !== 'AMERICAS';
      return isRegionDest && isNotAmericas;
    });
  }

  _getAdvancedOptions() {
    return {
      absAssetClass: get(this, 'absAssetClass'),
      assetClass: get(this, 'assetClass'),
      bookManagerBankIds: get(this, 'bookManagerBankIds'),
      collateral: get(this, 'collateral'),
      countryIds: get(this, 'countryIds'),
      countryIdsExclude: get(this, 'countryIdsExclude'),
      couponGte: get(this, 'couponGte'),
      couponLte: get(this, 'couponLte'),
      couponType: get(this, 'couponType'),
      couponTypeExclude: get(this, 'couponTypeExclude'),
      coveredBonds: get(this, 'coveredBonds'),
      coveredBondsExclude: get(this, 'coveredBondsExclude'),
      currencyExclude: get(this, 'currencyExclude'),
      dealOriginatorIds: get(this, 'dealOriginatorIds'),
      dealType: get(this, 'dealType'),
      dealTypeExclude: get(this, 'dealTypeExclude'),
      distributionStatistics: get(this, 'distributionStatistics'),
      emergingMarket: get(this, 'emergingMarket'),
      emergingMarketExclude: get(this, 'emergingMarketExclude'),
      fitchRating: get(this, 'fitchRating'),
      industryIdsExclude: get(this, 'industryIdsExclude'),
      marketType: get(this, 'marketType'),
      marketTypeExclude: get(this, 'marketTypeExclude'),
      maturityGte: this._notNullDate(get(this, 'maturityGte')),
      maturityLte: this._notNullDate(get(this, 'maturityLte')),
      moodysRating: get(this, 'moodysRating'),
      rating: get(this, 'rating'),
      ratingExclude: get(this, 'ratingExclude'),
      relatedStories: get(this, 'relatedStories'),
      spRating: get(this, 'spRating'),
      subordinatedHybridPreferred: get(this, 'subordinatedHybridPreferred'),
      subordinatedHybridPreferredExclude: get(
        this,
        'subordinatedHybridPreferredExclude'
      ),
      term: get(this, 'term'),
      termExclude: get(this, 'termExclude'),
    };
  }

  _advancedOptionSelected() {
    let advancedOptions = this._getAdvancedOptions();
    for (var key in advancedOptions) {
      const value = advancedOptions[key];
      if (isPresent(value) && value !== false) {
        return true;
      }
    }
    return false;
  }

  _resetAllAdvancedFieldSelections() {
    // refactor this to include ability to use when updating resetFilters action
    /* const advancedParams = get(this, 'advancedParams');
    advancedParams.forEach((param) => {
      let paramValue = get(this, param);
      if (isPresent(paramValue)) {
        const paramType = typeOf(paramValue);
        if (paramType === 'string') {
          set(this, param, null);
        } else if (paramType === 'boolean') {
          set(this, param, false);
        } else if (paramType === 'array') {
          let paramSelectionTitle = param + 'Selection';
          const uniqueSelectionTitles = get(this, 'uniqueSelectionTitles');
          if (isPresent(uniqueSelectionTitles[param])) {
            paramSelectionTitle = uniqueSelectionTitles[param];
          }
          let paramSelection = get(this, paramSelectionTitle);
          const list = paramSelection.toArray();
          paramSelection.removeObjects(list);
          set(this, param, new EmberA());
        }
      }
    }); */
  }

  @action
  setComponentRef() {}

  @action
  searchRegions(query) {
    let rawRegions = this.regionOptions.slice();
    let sifter = new Sifter(rawRegions);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => rawRegions.at(score.id));
    return opts;
  }

  @action
  searchCurrencyOptions(query) {
    let rawCurrencyOptions = this.dealOptions.currency.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(rawCurrencyOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map(
      (score) => rawCurrencyOptions.at(score.id).name
    );
    return opts;
  }

  @action
  searchCouponTypeOptions(query) {
    let rawCouponTypeOptions = this.dealOptions.couponType.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(rawCouponTypeOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.couponType.at(score.id)
    );
    return opts;
  }

  @action
  searchStatus(query) {
    let statusOptionObjects = this.dealOptions.status.map((s) => ({ name: s }));
    let sifter = new Sifter(statusOptionObjects);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.status.at(score.id)
    );
    return opts;
  }

  @action
  searchIndustriesOptions(query) {
    let rawOptions = this.industries.slice();
    let sifter = new Sifter(rawOptions);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => rawOptions.at(score.id));
    return opts;
  }

  @action
  searchCountry(query) {
    let allCountries = this.countries.slice();
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
  searchSubordinatedHybridPreferred(query) {
    let statusOptionObjects = this.dealOptions.subordinatedHybridPreferred.map(
      (s) => ({ name: s })
    );
    let sifter = new Sifter(statusOptionObjects);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.subordinatedHybridPreferred.at(score.id)
    );
    return opts;
  }

  @action
  searchRating(query) {
    let ratingOptions = this.dealOptions.rating.map((s) => ({ name: s }));
    let sifter = new Sifter(ratingOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.rating.at(score.id)
    );
    return opts;
  }

  @action
  searchDealType(query) {
    let dealTypeOptions = this.dealOptions.dealType.map((s) => ({ name: s }));
    let sifter = new Sifter(dealTypeOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.dealType.at(score.id)
    );
    return opts;
  }

  @action
  searchMarketType(query) {
    let marketTypeOptions = this.dealOptions.marketType.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(marketTypeOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.marketType.at(score.id)
    );
    return opts;
  }

  @action
  searchCoveredBonds(query) {
    let coveredBondsOptions = this.dealOptions.coveredBonds.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(coveredBondsOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.coveredBonds.at(score.id)
    );
    return opts;
  }

  @action
  searchMoodysRating(query) {
    let moodysRatingOptions = this.dealOptions.moodysRating.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(moodysRatingOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.moodysRating.at(score.id)
    );
    return opts;
  }

  @action
  searchSpRating(query) {
    let spRatingOptions = this.dealOptions.spRating.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(spRatingOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.spRating.at(score.id)
    );
    return opts;
  }

  @action
  searchfitchRating(query) {
    let fitchRatingOptions = this.dealOptions.fitchRating.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(fitchRatingOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.fitchRating.at(score.id)
    );
    return opts;
  }

  @action
  searchAssetClass(query) {
    let assetClassOptions = this.dealOptions.assetClass.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(assetClassOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.assetClass.at(score.id)
    );
    return opts;
  }

  @action
  searchAbsAssetClass(query) {
    let absAssetClassOptions = this.dealOptions.absAssetClass.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(absAssetClassOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.absAssetClass.at(score.id)
    );
    return opts;
  }

  @action
  searchCollateral(query) {
    let collateralOptions = this.dealOptions.collateral.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(collateralOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.collateral.at(score.id)
    );
    return opts;
  }

  @action
  searchFormat(query) {
    let formatOptions = this.dealOptions.format.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(formatOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.format.at(score.id)
    );
    return opts;
  }

  @action
  searchEsgSriDeal(query) {
    let options = this.dealOptions.esgSriDealType.map((s) => ({
      name: s,
    }));
    let sifter = new Sifter(options);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.dealOptions.esgSriDealType.at(score.id)
    );
    return opts;
  }

  @task(function* (query) {
    yield timeout(600);
    return this.store
      .query('book-manager-bank', { name: query, per: 15 })
      .then((banks) => {
        let rawBanks = banks.toArray();
        let sifter = new Sifter(rawBanks);
        let results = sifter.search(query, {
          fields: ['fullName'],
          sort: [{ field: 'fullName', direction: 'asc' }],
          limit: 15,
        });
        let opts = results.items.map((score) => rawBanks.at(score.id));
        return opts;
      });
  })
  searchBookBanks;

  @task(function* (query) {
    yield timeout(600);
    return this.store
      .query('deal-originator', { name: query, per: 15 })
      .then((dealOriginators) => {
        let dealOriginatorOptions = dealOriginators.toArray();
        let sifter = new Sifter(dealOriginatorOptions);
        let results = sifter.search(query, {
          fields: ['name'],
          sort: [{ field: 'name', direction: 'asc' }],
          limit: 15,
        });
        let opts = results.items.map((score) =>
          dealOriginatorOptions.at(score.id)
        );
        return opts;
      });
  })
  searchDealOriginator;

  @action
  saveSearch() {}

  @action
  resetFilters() {}

  @action
  findDeals() {}

  @action
  goToSavedSearch() {}

  @action
  deleteSearch() {}

  @action
  addToDashboard() {}

  @action
  simpleSearch() {
    $('#more-fields').collapse('hide');
    if (get(this, 'pendingSearch')) {
      set(this, 'showingAdvancedSearch', false);
      /* if (this._advancedOptionSelected()) {
        this._resetAllAdvancedFieldSelections();
      } */
    }
  }

  @action
  advancedSearch() {
    $('#more-fields').collapse('show');
    if (get(this, 'pendingSearch')) {
      set(this, 'showingAdvancedSearch', true);
    }
  }

  @action
  backToSearch() {}

  // select actions
  @action
  regionChange(selection) {
    this.destinations = selection.map((s) => s.name);
    this.region = selection;
  }

  @action
  onStatusChange(selection) {
    this.status = selection;
    this.statusSelection = selection;
  }

  @action
  issuerChange(selection) {
    this.issuerIds = selection.map((s) => get(s, 'id'));
    this.issuersSelection = selection;
  }

  @action
  industryChange(selection) {
    this.industryIds = selection.map((s) => get(s, 'id'));
    this.industriesSelection = selection;
  }

  @action
  currencyChange(selection) {
    this.currency = selection;
    this.currencySelection = selection;
  }

  @action
  currencyExcludeChange(selection) {
    this.currencyExclude = selection;
    this.currencyExcludeSelection = selection;
  }

  @action
  couponTypeChange(selection) {
    this.couponType = selection;
    this.couponTypeSelection = selection;
  }

  @action
  industryExcludeChange(selection) {
    this.industryIdsExclude = selection.map((s) => get(s, 'id'));
    this.industriesExcludeSelection = selection;
  }

  @action
  countryChange(selection) {
    this.countryIds = selection.map((s) => get(s, 'id'));
    this.countriesSelection = selection;
  }

  @action
  countryExcludeChange(selection) {
    this.countryIdsExclude = selection.map((s) => get(s, 'id'));
    this.countriesExcludeSelection = selection;
  }

  @action
  couponExcludeChange(selection) {
    this.couponTypeExclude = selection;
    this.couponTypeExcludeSelection = selection;
  }

  @action
  subordinatedHybridPreferredChange(selection) {
    this.subordinatedHybridPreferred = selection;
    this.subordinatedHybridPreferredSelection = selection;
  }

  @action
  subordinatedHybridPreferredExcludeChange(selection) {
    this.subordinatedHybridPreferredExclude = selection;
    this.subordinatedHybridPreferredExcludeSelection = selection;
  }

  @action
  ratingChange(selection) {
    this.rating = selection;
    this.ratingSelection = selection;
  }

  @action
  ratingExcludeChange(selection) {
    this.ratingExclude = selection;
    this.ratingExcludeSelection = selection;
  }

  @action
  dealTypeChange(selection) {
    this.dealType = selection;
    this.dealTypeSelection = selection;
  }

  @action
  dealTypeExcludeChange(selection) {
    this.dealTypeExclude = selection;
    this.dealTypeExcludeSelection = selection;
  }

  @action
  marketTypeChange(selection) {
    this.marketType = selection;
    this.marketTypeSelection = selection;
  }

  @action
  marketTypeExcludeChange(selection) {
    this.marketTypeExclude = selection;
    this.marketTypeExcludeSelection = selection;
  }

  @action
  coveredBondsChange(selection) {
    this.coveredBonds = selection;
    this.coveredBondsSelection = selection;
  }

  @action
  coveredBondsExcludeChange(selection) {
    this.coveredBondsExclude = selection;
    this.coveredBondsExcludeSelection = selection;
  }

  @action
  moodysRatingChange(selection) {
    this.moodysRating = selection;
    this.moodysRatingSelection = selection;
  }

  @action
  spRatingChange(selection) {
    this.spRating = selection;
    this.spRatingSelection = selection;
  }

  @action
  fitchRatingChange(selection) {
    this.fitchRating = selection;
    this.fitchRatingSelection = selection;
  }

  @action
  assetClassChange(selection) {
    this.assetClass = selection;
    this.assetClassSelection = selection;
  }

  @action
  absAssetClassChange(selection) {
    this.absAssetClass = selection;
    this.absAssetClassSelection = selection;
  }

  @action
  collateralChange(selection) {
    this.collateral = selection;
    this.collateralSelection = selection;
  }

  @action
  onBookManagerBankChange(selection) {
    this.bookManagerBankIds = selection.map((s) => get(s, 'id'));
    this.bookManagerBanksSelection = selection;
  }

  @action
  onDealOriginatorChange(selection) {
    this.dealOriginatorIds = selection.map((s) => get(s, 'id'));
    this.dealOriginatorsSelection = selection;
  }

  @action
  formatChange(selection) {
    this.format = selection;
    this.formatSelection = selection;
  }

  @action
  esgSriDealTypeChange(selection) {
    this.esgSriDealType = selection;
    this.esgSriDealTypeSelection = selection;
  }
}
