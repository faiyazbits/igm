import { action } from '@ember/object';
import { service } from '@ember/service';
import Component from '@glimmer/component';
import Sifter from 'sifter';

export default class DealOriginatorFormComponent extends Component {
  @service('deal-originators') DealOriginatorsService;

  @action
  save() {
    this.DealOriginatorsService.save(this.args.dealOriginator);
  }

  @action
  async searchDealOriginatorOptions(query) {
    let rawOption = this.args.dealOriginators.slice();
    return this.sifterSearch(query, rawOption, await this.args.dealOriginators, 'name');
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
}
