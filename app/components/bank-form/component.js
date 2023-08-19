import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { tracked } from '@glimmer/tracking';
import Sifter from 'sifter';

export default class BankFormComponent extends Component {
  @service('banks') banksService;
  @service store;

  @tracked
  selectedMergerBank = this.mergerBank;

  get bank() {
    return this.args.bank;
  }

  get mergerBank() {
    const mergerId = this.bank.mergerId;
    if (isPresent(mergerId)) {
      const mergerBank = this.store.peekRecord('bank', mergerId);
      return mergerBank;
    }
    return null;
  }

  @action
  save() {
    this.banksService.save(this.args.bank);
  }

  @action
  searchBankOptions(query) {
    let rawOption = this.args.allBanks.slice();
    return this.sifterSearch(query, rawOption, this.args.allBanks, 'fullName');
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
  onMergerBankChange(mergerBank) {
    this.selectedMergerBank = mergerBank;
    const mergerId = mergerBank.id;
    this.bank.mergerId = mergerId;
  }
}
