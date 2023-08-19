import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ConfirmButtonComponent extends Component {
  @service() session;
  @tracked showConfirm = false;

  @action
  confirm() {
    this.showConfirm = true;
  }

  @action
  cancel() {
    this.showConfirm = false;
  }

  @action
  delete() {
    this.showConfirm = false;
    this.args.action();
  }
  
}
