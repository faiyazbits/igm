import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';
import Sifter from 'sifter';

export default class DestinationGroupFormComponent extends Component {
  @service store;
  @service destinations;

  get destinationGroup() {
    return this.args.destinationGroup || null;
  }
  @action
  delete() {
    if (confirm('Are you sure you want to delete this?')) {
      this.args.delete(this.destinationGroup);
    }
  }

  @action
  save() {
    this.args.save(this.destinationGroup);
  }

  @action
  onDestinationChange(selectedDestinations) {
    this.args.destinationGroup.destinations = selectedDestinations;
  }

  @action
  searchStoryDestinationsOptions(query) {
    let rawOption = this.destinations.storyDestinations.slice();
    return this.sifterSearch(query, rawOption, this.destinations.storyDestinations, 'displayName');
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
