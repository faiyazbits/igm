import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import Sifter from 'sifter';

export default class TrancheFormComponent extends Component {
  @service dealOptions;
  @service store;
  @service deals;
  @service destinations;

  @task(function* (query) {
    yield timeout(600);
    return this.store.query('book-manager-bank', { name: query, per: 15 })
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
    return this.store.query('other-manager-bank', { name: query, per: 15 })
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
  searchMoodysRatingOptions(query) {
    let rawOption = this.moodysRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.moodysRatingOptions, 'name');
  }

  @action
  searchSpRatingOptions(query) {
    let rawOption = this.spRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.spRatingOptions, 'name');
  }

  @action
  searchFitchRatingOptions(query) {
    let rawOption = this.fitchRatingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.fitchRatingOptions, 'name');
  }

  @action
  searchCurrencyOptions(query) {
    let rawOption = this.currencyOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.currencyOptions, 'name');
  }

  @action
  searchCouponTypeOptions(query) {
    let rawOption = this.couponTypeOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.couponTypeOptions, 'name');
  }

  @action
  searchTranchRegionOptions(query) {
    let rawOption = this.destinations.regionsAndNotAmerica.slice();
    return this.sifterSearch(query, rawOption, this.destinations.regionsAndNotAmerica, 'displayName');
  }

  @action
  searchRatingOptions(query) {
    let rawOption = this.ratingOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.ratingOptions, 'name');
  }

  sifterSearch(query, rawOptionList, optionList, fieldName){
    let sifter = new Sifter(rawOptionList);
    let results = sifter.search(query, {
      fields: [fieldName],
      sort: [{ field: fieldName, direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => optionList.at(score.id));
    return opts;
  }

  get tranche() {
    return this.args.tranche;
  }

  get moodysRatingOptions() {
    return this.dealOptions.moodysRating;
  }

  get spRatingOptions() {
    return this.dealOptions.spRating;
  }

  get fitchRatingOptions() {
    return this.dealOptions.fitchRating;
  }

  get currencyOptions() {
    return this.dealOptions.currency;
  }

  get couponTypeOptions() {
    return this.dealOptions.couponType;
  }

  get ratingOptions() {
    return this.dealOptions.rating;
  }

  @action
  otherManagerBankChange(selectedBanks) {
    this.tranche.otherManagerBanks = selectedBanks;
  }

  @action
  onBookManagerBankChange(selectedBanks) {
    this.tranche.bookManagerBanks = selectedBanks;
  }

  @action
  onDealRegionChange(selectedDestinations) {
    this.tranche.destinations = selectedDestinations;
  }

  @action
  clone() {
    this.args.clone(this.tranche);
  }

  @action
  delete() {
    this.deals.deleteTranche(this.tranche);
  }

  @action
  onDateOfferedChange(selectedDate) {
    this.tranche.dateOffered = selectedDate;
  }
  
  @action
  onExpectedMaturityChange(selectedDate) {
    this.tranche.expectedMaturity = selectedDate;
  }

  @action
  onLegalMaturityChange(selectedDate) {
    this.tranche.legalMaturity = selectedDate;
  }
}
