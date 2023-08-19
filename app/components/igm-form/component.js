import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class IgmFormComponent extends Component {
  @action
  submit(event) {
    event.preventDefault();
    this.args.submitForm(this.args.for);
  }
}
