import Component from '@glimmer/component';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import Sifter from 'sifter';

export default class IssuerFormComponent extends Component {
  @service issuers;
  @service store;

  @task(function* (query) {
    yield timeout(600);
    return this.store.query('issuer', { name: query, per: 15 })
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

  @tracked
  selectedMergerIssuer = this.mergerIssuer;

  get issuer() {
    return this.args.issuer;
  }

  get mergerIssuer() {
    const mergerId = this.issuer.mergerId;
    if (this.mergerPresent) {
      const mergerIssuer = this.store.peekRecord('issuer', mergerId);
      return mergerIssuer;
    }
    return null;
  }

  get mergerPresent() {
    return isPresent(this.issuer.mergerId);
  }

  get canShowMergerControls() {
    return this.mergerPresent && this.issuer.id;
  }

  @action
  save() {
    this.issuers.save(this.args.issuer);
  }

  @action
  changeMerger() {
    this.resetMerger();
  }

  @action
  removeMerger() {
    this.resetMerger();
  }

  @action
  onMergerChange(mergerIssuer) {
    this.selectedMergerIssuer = mergerIssuer;
    this.issuer.merger = mergerIssuer;
    this.issuer.mergerId = mergerIssuer.id;
    this.issuer.mergerName = mergerIssuer.name;
  }

  @action
  async searchCountryOptions(query) {
    let rawOption = this.args.allCountries.slice();
    return this.sifterSearch(query, rawOption, await this.args.allCountries, 'name');
  }

  @action
  async searchIndustriesOptions(query) {
    let rawOption = this.args.allIndustries.slice();
    return this.sifterSearch(query, rawOption, await this.args.allIndustries, 'displayName');
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

  resetMerger() {
    this.issuer.merger = null;
    this.issuer.mergerId = null;
    this.issuer.mergerName = null;
    this.selectedMergerIssuer = null;
  }
}
