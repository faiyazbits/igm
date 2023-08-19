import Component from '@glimmer/component';
import { action, computed, get, set } from '@ember/object';
import { service } from '@ember/service';
import { A } from '@ember/array';
import { isPresent } from '@ember/utils';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import Sifter from 'sifter';

export default class CorporateDealFormComponent extends Component {
  @service dealOptions;
  @service store;
  @service deals;
  @service destinations;

  @tracked
  showDistributionStats = this.isDistributionPresent;

  get deal() {
    return this.args.deal;
  }

  get statusOptions() {
    return this.dealOptions.status;
  }

  get formatOptions() {
    return this.dealOptions.format;
  }

  get securitiesOptions() {
    return this.dealOptions.securities;
  }

  get ratingOptions() {
    return this.dealOptions.rating;
  }

  get currencyOptions() {
    return this.dealOptions.currency;
  }

  get couponTypeOptions() {
    return this.dealOptions.couponType;
  }

  get paymentOptions() {
    return this.dealOptions.payment;
  }

  get dealTypeOptions() {
    return this.dealOptions.dealType;
  }

  get marketTypeOptions() {
    return this.dealOptions.marketType;
  }

  get coveredBondsOptions() {
    return this.dealOptions.coveredBonds;
  }

  get subordinatedHybridPreferredOptions() {
    return this.dealOptions.subordinatedHybridPreferred;
  }
  get fdicGgbOptions() {
    return this.dealOptions.fdicGgb;
  }

  get indexLinkedOptions() {
    return this.dealOptions.indexLinked;
  }

  get moodysRatingOptions() {
    return this.dealOptions.moodysRating;
  }

  get moodysOutlookOptions() {
    return this.dealOptions.moodysOutlook;
  }

  get spRatingOptions() {
    return this.dealOptions.spRating;
  }

  get spOutlookOptions() {
    return this.dealOptions.spOutlook;
  }

  get fitchRatingOptions() {
    return this.dealOptions.fitchRating;
  }

  get fitchOutlookOptions() {
    return this.dealOptions.fitchOutlook;
  }

  get dbrsRatingOptions() {
    return this.dealOptions.dbrsRating;
  }

  get jcrRatingOptions() {
    return this.dealOptions.jcrRating;
  }

  get riRatingOptions() {
    return this.dealOptions.riRating;
  }

  get listingOptions() {
    return this.dealOptions.listing;
  }

  get governingLawOptions() {
    return this.dealOptions.governingLaw;
  }

  get isDistributionPresent() {
    return this.deal.distribution.then((d) => !!d);
  }

  @task(function* (query) {
    yield timeout(600);
    return this.store
      .query('issuer', { name: query, per: 15 })
      .then((issuers) => {
        let rawIssuers = issuers.toArray();
        let sifter = new Sifter(rawIssuers);
        let results = sifter.search(query, {
          fields: ['name'],
          sort: [{ field: 'name', direction: 'asc' }],
          limit: 15,
        });
        let opts = results.items.map((score) => rawIssuers.at(score.id));
        return opts;
      });
  })
  searchIssuers;

  @task(function* (query) {
    yield timeout(600);
    return this.store
      .query('book-manager-bank', { name: query, per: 15 })
      .then((banks) => {
        let rawBanks = banks.toArray();
        let sifter = new Sifter(rawBanks);
        let results = sifter.search(query, {
          fields: ['shortName'],
          sort: [{ field: 'shortName', direction: 'asc' }],
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
      .query('other-manager-bank', { name: query, per: 15 })
      .then((banks) => {
        let rawBanks = banks.toArray();
        let sifter = new Sifter(rawBanks);
        let results = sifter.search(query, {
          fields: ['shortName'],
          sort: [{ field: 'shortName', direction: 'asc' }],
          limit: 15,
        });
        let opts = results.items.map((score) => rawBanks.at(score.id));
        return opts;
      });
  })
  searchOtherBanks;

  @action
  otherManagerBankChange(selectedBanks) {
    this.args.deal.otherManagerBanks = selectedBanks;
  }

  @action
  onBookManagerBankChange(selectedBanks) {
    this.args.deal.bookManagerBanks = selectedBanks;
  }

  @action
  onDealRegionChange(selectedDestinations) {
    this.deal.destinations = selectedDestinations;
  }

  @action
  onStatusChange(selectedStatus) {
    this.deal.status = selectedStatus;
  }

  @action
  searchStatus(query) {
    let statusOptionObjects = this.statusOptions.map((s) => ({ name: s }));
    let sifter = new Sifter(statusOptionObjects);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => this.statusOptions.at(score.id));
    return opts;
  }

  @action
  searchDealRegion(query) {
    let statusDealRegion = this.destinations.regionsAndNotAmerica.slice();
    let sifter = new Sifter(statusDealRegion);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.destinations.regionsAndNotAmerica.at(score.id)
    );
    return opts;
  }

  @action
  searchFormatOption(query) {
    let rawDealRegion = this.formatOptions.map((s) => ({ name: s }));
    let sifter = new Sifter(rawDealRegion);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => this.formatOptions.at(score.id));
    return opts;
  }

  @action
  searchSecuritiesOptions(query) {
    let rawSecuritiesOptions = this.securitiesOptions.map((s) => ({ name: s }));
    let sifter = new Sifter(rawSecuritiesOptions);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) =>
      this.securitiesOptions.at(score.id)
    );
    return opts;
  }

  @action
  searchRatingOptions(query) {
    let rawRatingOptions = this.ratingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawRatingOptions,
      this.ratingOptions,
      'name'
    );
  }

  @action
  searchCurrencyOptions(query) {
    let rawCurrencyOptions = this.currencyOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawCurrencyOptions,
      this.currencyOptions,
      'name'
    );
  }

  @action
  searchCouponTypeOptions(query) {
    let rawCouponTypeOptions = this.couponTypeOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawCouponTypeOptions,
      this.couponTypeOptions,
      'name'
    );
  }

  @action
  searchPaymentOptions(query) {
    let rawPaymentOptions = this.paymentOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawPaymentOptions,
      this.paymentOptions,
      'name'
    );
  }

  @action
  searchDealTypeOptions(query) {
    let rawDealTypeOptions = this.dealTypeOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawDealTypeOptions,
      this.dealTypeOptions,
      'name'
    );
  }

  @action
  searchMarketType(query) {
    let rawMarketType = this.marketTypeOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawMarketType,
      this.marketTypeOptions,
      'name'
    );
  }

  @action
  searchCoveredBonds(query) {
    let rawOption = this.coveredBondsOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawOption,
      this.coveredBondsOptions,
      'name'
    );
  }

  @action
  searchSubordinatedHybridPreferred(query) {
    let rawOption = this.subordinatedHybridPreferredOptions.map((s) => ({
      name: s,
    }));
    return this.sifterSearch(
      query,
      rawOption,
      this.subordinatedHybridPreferredOptions,
      'name'
    );
  }

  @action
  searchFdicGgbOptions(query) {
    let rawOption = this.fdicGgbOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.fdicGgbOptions, 'name');
  }

  @action
  searchIndexLinkedOptions(query) {
    let rawOption = this.indexLinkedOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.indexLinkedOptions, 'name');
  }

  @action
  searchMoodysRatingOptions(query) {
    let rawOption = this.moodysRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawOption,
      this.moodysRatingOptions,
      'name'
    );
  }

  @action
  searchMoodysOutlookOptions(query) {
    let rawOption = this.moodysOutlookOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawOption,
      this.moodysOutlookOptions,
      'name'
    );
  }

  @action
  searchSpRatingOptions(query) {
    let rawOption = this.spRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.spRatingOptions, 'name');
  }

  @action
  searchSpOutlookOptions(query) {
    let rawOption = this.spOutlookOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.spOutlookOptions, 'name');
  }

  @action
  searchFitchRatingOptions(query) {
    let rawOption = this.fitchRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.fitchRatingOptions, 'name');
  }

  @action
  searchFitchOutlookOptions(query) {
    let rawOption = this.fitchOutlookOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawOption,
      this.fitchOutlookOptions,
      'name'
    );
  }

  @action
  searchDbrsRatingOptions(query) {
    let rawOption = this.dbrsRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.dbrsRatingOptions, 'name');
  }

  @action
  searchJcrRatingOptions(query) {
    let rawOption = this.jcrRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.jcrRatingOptions, 'name');
  }

  @action
  searchRiRatingOptions(query) {
    let rawOption = this.riRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.riRatingOptions, 'name');
  }

  @action
  searchListingOptions(query) {
    let rawOption = this.listingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.listingOptions, 'name');
  }

  @action
  searchGoverningLawOptions(query) {
    let rawOption = this.governingLawOptions.map((s) => ({ name: s }));
    return this.sifterSearch(
      query,
      rawOption,
      this.governingLawOptions,
      'name'
    );
  }

  sifterSearch(query, rawOptionList, optionList, fieldName) {
    let sifter = new Sifter(rawOptionList);
    let results = sifter.search(query, {
      fields: [fieldName],
      sort: [{ field: fieldName, direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => optionList.at(score.id));
    return opts;
  }

  @action
  onFormatChange(selectedFormat) {
    this.deal.format = selectedFormat;
  }

  @action
  onRatingChange(selectedRating) {
    this.deal.rating = selectedRating;
  }

  @action
  onCurrencyChange(selectedCurrency) {
    this.deal.currency = selectedCurrency;
  }

  @action
  onCouponTypeChange(selectedCouponType) {
    this.deal.couponType = selectedCouponType;
  }

  @action
  onPaymentChange(selectedPayment) {
    this.deal.payment = selectedPayment;
  }

  @action
  onDealTypeChange(selectedDealType) {
    this.deal.dealType = selectedDealType;
  }

  @action
  onIssuerChange(selectedIssuer) {
    this.deal.issuer = selectedIssuer;
  }

  @action
  onDateOfferedChange(selectedDate) {
    this.deal.dateOffered = selectedDate;
  }

  @action
  onMaturityChange(selectedDate) {
    this.deal.maturity = selectedDate;
  }

  @action
  onSettlementDateChange(selectedDate) {
    this.deal.settlementDate = selectedDate;
  }

  @action
  onFirstCouponDateChange(selectedDate) {
    this.deal.firstCouponDate = selectedDate;
  }

  @action
  onInterestAccrualDateChange(selectedDate) {
    this.deal.interestAccrualDate = selectedDate;
  }

  @action
  onCallDateChange(selectedDate) {
    this.deal.callDate = selectedDate;
  }

  @action
  addDistribution() {
    this.showDistributionStats = Promise.resolve(true);
    this.store.createRecord('distribution', { deal: this.deal });
  }

  @action
  clone() {
    this.deals.clone(this.args.deal);
  }

  @action
  delete() {
    this.deals.delete(this.args.deal);
  }

  @action
  save(isPublished) {
    this.deals.saveCorporate(this.args.deal, isPublished);
  }
}
