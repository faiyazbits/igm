import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class UiPopoverToggleComponent extends Component {
  @tracked
  popover = null;
  tagName = 'a';

  get href() {
    return this.args.href || '#';
  }

  get title() {
    return this.args.title || null;
  }

  click(event) {
    event.preventDefault();
    this.args.toggle();
  }
}