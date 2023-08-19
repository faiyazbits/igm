import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PrintButton extends Component {
  @action
  print(event) {
    event.preventDefault();
    window.print();
  }
}
