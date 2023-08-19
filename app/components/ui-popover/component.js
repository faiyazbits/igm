import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class UiPopoverComponent extends Component {
  @tracked
  isOpen = false;

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }
}