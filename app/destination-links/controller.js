import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { get } from '@ember/object';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Sifter from 'sifter';

export default class DestinationLinksController extends Controller {
  queryParams = ['destinations'];
  per = 40;

  @tracked
  page = 1;

  @tracked
  destinations = [];

  @alias('model.meta.destination_names')
  destinationNames;

  @alias('model.meta.total_pages')
  totalPages;

  get columns() {
    const per = this.per;
    const model = get(this, 'model');

    return {
      left: model.slice(0, per / 2),
      right: model.slice(per / 2, get(model, 'length')),
    };
  }

  @action
  onDestinationsChange(selectedDestinations) {
    this.destinations = selectedDestinations;
  }

  @action
  async searchDestinationNamesOptions(query) {
    let rawOption = this.destinationNames.map((s) => ({ name: s }));
    return this.sifterSearch(query, rawOption, await this.destinationNames, 'name');
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
