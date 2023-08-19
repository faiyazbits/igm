import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { service } from '@ember/service';

export default class FavoriteDestinationsComponent extends Component {
  destinationGroups = [];
  @service('stories') storyService;

  @tracked
  isEditing = false;

  @action
  done() {
    this.isEditing = false;

    const destinationGroups = this.args.destinationGroups.filter(
      (g) => g.hasDirtyAttributes
    );
    destinationGroups.forEach((g) => g.rollbackAttributes());
  }

  @action
  toggleIsEditing() {
    this.isEditing = !this.isEditing;
  }

  @action
  addDestinationGroup() {
    this.storyService.addDestinationGroup();
  }

  @action
  saveDestinationGroup(group) {
    this.storyService.saveDestinationGroup(group);
  }

  @action
  deleteDestinationGroup(group) {
    this.storyService.deleteDestinationGroup(group);
  }
}
