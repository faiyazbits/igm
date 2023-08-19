import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DealCommentsComponent extends Component {
  @tracked
  isOpen = false;
  tagName = '';

  @action
  toggle() {
    this.isOpen = !this.isOpen;
  }
}
