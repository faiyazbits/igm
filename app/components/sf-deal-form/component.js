import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import Sifter from 'sifter';

export default class SfDealFormComponent extends Component {
  @service dealOptions;
  @service store;
  @service deals;
  @service destinations;

  get deal() {
    return this.args.deal;
  }

  get hasError() {
    return this.deal.errors.get('dateOffered');
  }

  get securitiesOptions() {
    return this.dealOptions.securities;
  }

  get assetClassOptions() {
    return this.dealOptions.assetClass;
  }

  get cdoTypeOptions() {
    return this.dealOptions.cdoType;
  }

  get cdoAssetClassOptions() {
    return this.dealOptions.cdoAssetClass;
  }

  get collateralOptions() {
    return this.dealOptions.collateral;
  }

  get absAssetClassOptions() {
    return this.dealOptions.absAssetClass;
  }

  get statusOptions() {
    return this.dealOptions.status;
  }

  get marketOptions() {
    return this.dealOptions.market;
  }

  get currencyOptions() {
    return this.dealOptions.currency;
  }

  get formatOptions() {
    return this.dealOptions.format;
  }

  get usRiskRetentionCompliantOptions() {
    return this.dealOptions.usRiskRetentionCompliant;
  }

  get euRiskRetentionCompliantOptions() {
    return this.dealOptions.euRiskRetentionCompliant;
  }

  get stsCompliantOptions() {
    return this.dealOptions.stsCompliant;
  }

  get esgSriDealTypeOptions() {
    return this.dealOptions.esgSriDealType;
  }

  @task(function* (query) {
    yield timeout(600);
    return this.store.query('dealOriginator', { name: query, per: 15 })
    .then((originator) => {
      let rawOriginator = originator.toArray();
      let sifter = new Sifter(rawOriginator);
      let results = sifter.search(query, {
        fields: ['name'],
        sort: [{ field: 'name', direction: 'asc' }],
        limit: 15,
      });
      let opts = results.items.map((score) => rawOriginator.at(score.id));
      return opts;
    });
  })
  searchDealOriginator;

  @task(function* (query) {
    yield timeout(600);
    return this.store.query('issuer', { name: query, per: 15 })
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

  @action
  searchSecuritiesOptions(query) {
    let rawOption = this.securitiesOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.securitiesOptions, 'name');
  }

  @action
  searchDealRegion(query) {
    let rawOption = this.destinations.regionsAndNotAmerica.slice();
    return this.sifterSearch(query, rawOption, this.destinations.regionsAndNotAmerica, 'displayName');
  }

  @action
  searchAssetClassOptions(query) {
    let rawOption = this.assetClassOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.assetClassOptions, 'name');
  }

  @action
  searchCdoTypeOptions(query) {
    let rawOption = this.cdoTypeOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.cdoTypeOptions, 'name');
  }

  @action
  searchCdoAssetClassOptions(query) {
    let rawOption = this.cdoAssetClassOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.cdoAssetClassOptions, 'name');
  }

  @action
  searchCollateralOptions(query) {
    let rawOption = this.collateralOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.collateralOptions, 'name');
  }

  @action
  searchAbsAssetClassOptions(query) {
    let rawOption = this.absAssetClassOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.absAssetClassOptions, 'name');
  }

  @action
  searchStatusOptions(query) {
    let rawOption = this.statusOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.statusOptions, 'name');
  }

  @action
  searchMarketOptions(query) {
    let rawOption = this.marketOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.marketOptions, 'name');
  }

  @action
  searchCurrencyOptions(query) {
    let rawOption = this.currencyOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.currencyOptions, 'name');
  }

  @action
  searchFormatOptions(query) {
    let rawOption = this.formatOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.formatOptions, 'name');
  }

  @action
  searchUsRiskRetentionCompliantOptions(query) {
    let rawOption = this.usRiskRetentionCompliantOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.usRiskRetentionCompliantOptions, 'name');
  }

  @action
  searchEuRiskRetentionCompliantOptions(query) {
    let rawOption = this.euRiskRetentionCompliantOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.euRiskRetentionCompliantOptions, 'name');
  }

  @action
  searchStsCompliantOptions(query) {
    let rawOption = this.stsCompliantOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.stsCompliantOptions, 'name');
  }

  @action
  searchEsgSriDealTypeOptions(query) {
    let rawOption = this.esgSriDealTypeOptions.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, this.esgSriDealTypeOptions, 'name');
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

  @action
  onDateOfferedChange(selectedDate) {
    this.deal.dateOffered = selectedDate;
  }

  @action
  onSettlementDateChange(selectedDate) {
    this.deal.settlementDate = selectedDate;
  }

  @action
  onEodDateChange(selectedDate) {
    this.deal.eodDate = selectedDate;
  }

  @action
  addTranche() {
    const position = get(this.deal, 'tranches.length');
    this.store.createRecord('tranche', { position: position, deal: this.deal });
  }

  @action
  clone() {
    this.deals.clone(this.args.deal);
  }

  @action
  onDealRegionChange(selectedDestinations) {
    this.deal.destinations = selectedDestinations;
  }

  @action
  onIssuerChange(selectedIssuer) {
    this.deal.issuer = selectedIssuer;
  }

  @action
  cloneTranche(tranche) {
    const position = get(this.deal, 'tranches.length');
    this.deals.cloneTranche(this.deal, tranche, position);
  }

  @action
  delete() {
    this.deals.delete(this.args.deal);
  }

  @action
  save(isPublished) {
    const totalDealSize = this.deal.get('totalDealSize');
    this.deal.amountOffered = totalDealSize;
    this.deals.saveSF(this.deal, isPublished);
  }
}
