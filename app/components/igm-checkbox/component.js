import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { merge, flatten } from 'lodash';
import Sifter from 'sifter';

export default class IgmCheckBoxComponent extends Component {
  @tracked
  checked = false;

  @action
  checkBoxInserted() {}
}
