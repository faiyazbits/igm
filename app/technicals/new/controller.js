import { action, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { service } from '@ember/service';
import Sifter from 'sifter';

export default class TechnicalsNewController extends Controller {
  @service('technicals') technicalsService;
  @alias('model') technical;

  @action
  save() {
    this.technicalsService.save(this.technical);
  }

  @action
  onDestinationChange(selectedDestinations) {
    this.technical.destinations = selectedDestinations;
  }

  @action
  async searchDestinationOptions(query) {
    let rawOption = this.allDestinations.slice();
    return this.sifterSearch(query, rawOption, await this.allDestinations, 'name');
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
