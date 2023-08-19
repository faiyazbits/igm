import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class BooleanToggleComponent extends Component {
  
  @action
  toggle() {
    this.args.toggle();
  }
}
