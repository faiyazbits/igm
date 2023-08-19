import Component from '@glimmer/component';
import { action } from '@ember/object';
import UiPopoverComponent from '../ui-popover/component';

export default class AddFeedPopoverComponent extends UiPopoverComponent {
  @action
  async save() {
    await this.args.save();
    this.isOpen = false;
  }
}
