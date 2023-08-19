import Controller from '@ember/controller';
import { action, set, get, getProperties } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty, isPresent } from '@ember/utils';
import moment from 'moment-timezone';
import SearchQuery from '../models/search-query';
import Sifter from 'sifter';
import { task, timeout } from 'ember-concurrency';

export default class VolumeReportSearchController extends Controller {
    @service() dealOptions;
    @service() session;
    @service() store;
    @alias('session.currentUser') currentUser;

    @tracked pendingSearch = true;
    @tracked countries = [];
    @tracked savedSearches = [];
    @tracked allDestinations = [];
    @tracked advancedFieldsShown = false;
    @tracked showCorpVolumeReportFilter = true;
    @tracked isSavedSearchOpen = false;
    @tracked title = null;
    @tracked displayCurrency = 'USD';
    @tracked currency = null;

    queryParams = [
        'advancedFieldsShown',
        'bookManagerBankIds',
        'canExport',
        'currency',
        'contentType',
        'countryIds',
        'countryIdsExclude',
        'couponType',
        'couponTypeExclude',
        'coveredBonds',
        'coveredBondsExclude',
        'dateOfferedGte',
        'dateOfferedLte',
        'dealIdentifier',
        'dealType',
        'dealTypeExclude',
        'destinations',
        'displayCurrency',
        'emergingMarket',
        'format',
        'esgSriDealType',
        'emergingMarketExclude',
        'fitchRating',
        'industryIds',
        'industryIdsExclude',
        'industryTable',
        'issuerIds',
        'marketType',
        'marketTypeExclude',
        'maturityGte',
        'maturityLte',
        'moodysRating',
        'period',
        'rating',
        'ratingExclude',
        'selfLed',
        'sendInCSV',
        'sendInExcel',
        'sendInXLSX',
        'sfReportCategory',
        'sfReportType',
        'spRating',
        'subordinatedHybridPreferred',
        'subordinatedHybridPreferredExclude',
        'term',
        'termExclude',
        'title'
    ];

    returnedQueryParams = [
        'book_manager_bank_ids',
        'can_export',
        'currency',
        'content_type',
        'country_ids',
        'country_ids_exclude',
        'coupon_type',
        'coupon_type_exclude',
        'covered_bonds',
        'covered_bonds_exclude',
        'date_offered_gte',
        'date_offered_lte',
        'deal_identifier',
        'deal_type',
        'deal_type_exclude',
        'destinations',
        'display_currency',
        'emerging_market',
        'emerging_market_exclude',
        'fitch_rating',
        'industry_ids',
        'industry_ids_exclude',
        'industry_table',
        'issuer_ids',
        'market_type',
        'market_type_exclude',
        'maturity_gte',
        'maturity_lte',
        'moodys_rating',
        'period',
        'rating',
        'rating_exclude',
        'self_led',
        'send_in_csv',
        'send_in_excel',
        'send_in_xlsx',
        'sf_report_category',
        'sf_report_type',
        'sp_rating',
        'subordinated_hybrid_preferred',
        'subordinated_hybrid_preferred_exclude',
        'term',
        'term_exclude',
        'title',
        'format',
        'esg_sri_deal_type'
    ]

    advancedParams = [
        'bookManagerBankIds',
        'countryIds',
        'countryIdsExclude',
        'couponGte',
        'couponLte',
        'couponType',
        'couponTypeExclude',
        'coveredBonds',
        'coveredBondsExclude',
        'dealType',
        'format',
        'esgSriDealType',
        'dealTypeExclude',
        'emergingMarket',
        'emergingMarketExclude',
        'fitchRating',
        'industryIds',
        'industryIdsExclude',
        'issuerIds',
        'marketType',
        'marketTypeExclude',
        'maturityGte',
        'maturityLte',
        'moodysRating',
        'rating',
        'ratingExclude',
        'relatedStories',
        'spRating',
        'subordinatedHybridPreferred',
        'subordinatedHybridPreferredExclude',
        'term',
        'termExclude'
    ]

    showCorpIndustryReportFilter = false;
    showSFVolumeReportFilter = false;

    contentType = 'VolumeReport';
    dealIdentifier = 'corporate';
    // emergingMarket = false;
    // emergingMarketExclude = false;
    industryTable = false;
    // period = 'month';
    sfReportCategory = null;
    sfReportType = null;
    selfLed = null;
    // sendInCSV = false;
    // sendInExcel = false;
    // sendInXLSX = false;
    // term = null;
    // termExclude = null;

    bookManagerBankIds = [];
    bookManagerBanks = [];
    countries = [];
    countriesExclude = [];
    countryIds = [];
    countryIdsExclude = [];
    couponType = [];
    couponTypeExclude = [];
    coveredBonds = [];
    coveredBondsExclude = [];
    dealType = [];
    dealTypeExclude = [];
    destinations = [];
    fitchRating = [];
    industries = [];
    industriesExclude = [];
    industryIds = [];
    industryIdsExclude = [];
    issuers = [];
    issuerIds = [];
    marketType = [];
    marketTypeExclude = [];
    moodysRating = [];
    rating = [];
    ratingExclude = [];
    region = [];
    format = [];
    esgSriDealType = [];
    spRating = [];
    subordinatedHybridPreferred = [];
    subordinatedHybridPreferredExclude = [];

    bookManagerBanksSelection = [];
    countriesSelection = [];
    countriesExcludeSelection = [];
    couponTypeSelection = [];
    couponTypeExcludeSelection = [];
    coveredBondsSelection = [];
    coveredBondsExcludeSelection = [];
    dealTypeSelection = [];
    dealTypeExcludeSelection = [];
    fitchRatingSelection = [];
    industriesSelection = [];
    industriesExcludeSelection = [];
    @tracked issuersSelection = [];
    formatSelection = [];
    esgSriDealTypeSelection = [];
    marketTypeSelection = [];
    marketTypeExcludeSelection = [];
    moodysRatingSelection = [];
    ratingSelection = [];
    ratingExcludeSelection = [];
    spRatingSelection = [];
    subordinatedHybridPreferredSelection = [];
    subordinatedHybridPreferredExcludeSelection = [];

    @tracked dateOfferedGteMoment = moment().utc().startOf('year');

    @tracked dateOfferedLteMoment = moment().utc();

    get regionOptions() {
        return this.allDestinations.filter((d) => {
          const isRegionDest = get(d, 'destinationType') === 'region';
          const isNotAmericas = get(d, 'displayName') !== 'AMERICAS';
          return isRegionDest && isNotAmericas;
        });
    }

    get selfLedOption() {
        const selfLed = this.selfLed;
        if (selfLed == null) {
          return 'Yes';
        } else {
          return 'No';
        }
    }

    get savedVolumeReportSearches () {
        const sfDeals = get(this, 'savedSearches')
        .filter((ss) => ss.contentType == 'VolumeReport')
        .filter((ss) => ss.dealIdentifier == 'sf');

        const corporateDeals = get(this, 'savedSearches')
        .filter((ss) => ss.contentType == 'VolumeReport')
        .filter((ss) => ss.dealIdentifier == 'corporate');

        const showSearchFields = get(this, 'pendingSearch');
        const dealIdentifier = get(this, 'dealIdentifier');
        const industryTable = get(this, 'industryTable');
        // const advancedFieldsShown = this.advancedFieldsShown;

        if (showSearchFields) {
          $('#fields').collapse('show');
          if (dealIdentifier === 'sf') {
            this.setSFVR();
          } else if (dealIdentifier === 'corporate' && industryTable === true) {
            this.setCVIR();
          } else {
            this.setCVR();
          }
        //   this.advancedFieldsShown = advancedFieldsShown;
        } else {
          $('#fields').collapse('hide');
        }
        return sfDeals.concat(corporateDeals);
    }

    @action
    setCVR() {
        set(this, 'dealIdentifier', 'corporate');
        set(this, 'industryTable', false);
        set(this, 'selfLed', null);
        set(this, 'sfReportCategory', null);
        set(this, 'sfReportType', null);
        set(this, 'showCorpVolumeReportFilter', true);
        set(this, 'showCorpIndustryReportFilter', false);
        set(this, 'showSFVolumeReportFilter', false);
        if (this.advancedFieldsShown === false) {
          this._resetAllAdvancedFieldSelections();
        } 
        // else {
        //   this.advancedFieldsShown = false;
        // }
        $('#cvr').addClass('in active');
        $('#cvrTab').addClass('active');
        $('#cvir').removeClass('in active');
        $('#cvirTab').removeClass('active');
        $('#sfvr').removeClass('in active');
        $('#sfvrTab').removeClass('active');
    }

    @action
    setCVIR() {
        set(this, 'dealIdentifier', 'corporate');
        set(this, 'industryTable', true);
        set(this, 'selfLed', null);
        set(this, 'sfReportCategory', null);
        set(this, 'sfReportType', null);
        set(this, 'showCorpVolumeReportFilter', false);
        set(this, 'showCorpIndustryReportFilter', true);
        set(this, 'showSFVolumeReportFilter', false);
        if (this.advancedFieldsShown === false) {
            this._resetAllAdvancedFieldSelections();
        }
        //   else {
        //     this.advancedFieldsShown = false;
        //   }
        $('#cvir').addClass('in active');
        $('#cvirTab').addClass('active');
        $('#cvr').removeClass('in active');
        $('#cvrTab').removeClass('active');
        $('#sfvr').removeClass('in active');
        $('#sfvrTab').removeClass('active');
    }

    @action
    setSFVR() {
        set(this, 'dealIdentifier', 'sf');
        set(this, 'industryTable', false);
        set(this, 'selfLed', null);
        set(this, 'showCorpVolumeReportFilter', false);
        set(this, 'showCorpIndustryReportFilter', false);
        set(this, 'showSFVolumeReportFilter', true);
        this._resetAllAdvancedFieldSelections();
        $('#sfvr').addClass('in active');
        $('#sfvrTab').addClass('active');
        $('#cvr').removeClass('in active');
        $('#cvrTab').removeClass('active');
        $('#cvir').removeClass('in active');
        $('#cvirTab').removeClass('active');
    }

    _resetAllAdvancedFieldSelections() {
        // refactor this to include ability to use when updating resetFilters action
        const advancedParams = get(this, 'advancedParams');
        advancedParams.forEach((param) => {
            let paramValue = get(this, param);
            if (isPresent(paramValue)) {
                const paramType = typeOf(paramValue);
                if (paramType === 'string') {
                    set(this, param, null);
                } else if (paramType === 'boolean') {
                    set(this, param, false);
                } else if (paramType === 'array') {
                    if (get(this, 'showSFVolumeReportFilter') !== true && param !== 'countryIds') {
                        let paramSelectionTitle = param + 'Selection';
                        const uniqueSelectionTitles = get(this, 'uniqueSelectionTitles');
                        if (isPresent(uniqueSelectionTitles[param])) {
                            paramSelectionTitle = uniqueSelectionTitles[param];
                        }
                        let paramSelection = get(this, paramSelectionTitle);
                        if (paramSelection) {
                            const list = paramSelection.toArray();
                            paramSelection.removeObjects(list);
                            set(this, param, []);
                        }
                    }
                }
            }
        });
    }

    @action
    findTable(){}

    @action
    backToSearch(){}

    @action
    saveSearch(){}

    @action
    setIsSavedSearchOpen(params){
        this.isSavedSearchOpen = params;
    }

    @action
    goToSavedSearch(savedSearch){}

    @action
    deleteSearch(savedSearch){}

    @action
    resetFilters() {
        window.location.href = '/volume-report-search';
    }

    @action
    regionChange(selection) {
        this.destinations = selection.map((s) => s.name);
        this.region = selection;
    }

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
    displayCurrencyChange(selection) {}

    @action
    searchDisplayCurrency(query) {}

    @action
    currencyChange(selection) {}

    @action
    searchCurrency(query) {}

    @action
    showAdvancedFields() {
        $('#more-fields').collapse('show');
        this.advancedFieldsShown = true;
    }

    @action
    hideAdvancedFields() {
        $('#more-fields').collapse('hide');
        this.advancedFieldsShown = false;
    }

    @action
    issuerChange(selection) {
        this.issuerIds = selection.map((s) => get(s, 'id'));
        this.issuersSelection = selection;
    }

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

    @action
    onBookManagerBankChange(selection) {
        this.bookManagerBankIds = selection.map((s) => get(s, 'id'));
        this.bookManagerBanksSelection = selection;
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

    @action
    industryChange(selection) {
        this.industryIds = selection.map((s) => get(s, 'id'));
        this.industriesSelection = selection;
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
    industryExcludeChange(selection) {
        this.industryIdsExclude = selection.map((s) => get(s, 'id'));
        this.industriesExcludeSelection = selection;
    }
}
