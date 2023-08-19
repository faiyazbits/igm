import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import Sifter from 'sifter';

export default class TechnicalFormComponent extends Component {
  @service() session;

  @action
  publish() {
    this.args.publish(this.args.technical);
  }

  @action
  onDealRegionChange(selectedDestinations) {
    this.args.technical.destinations = selectedDestinations;
  }

  @action
  onHotChange(newDataString) {
    this.args.technical.tableData = newDataString;
  }

  @action
  async searchDestinationNamesOptions(query) {
    let rawOption = this.args.destinations.slice();
    return this.sifterSearch(query, rawOption, await this.args.destinations, 'name');
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
