import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { or } from '@ember/object/computed';
import { set, action } from '@ember/object';

export default class IgmInputComponent extends Component {
  get hasError() {
    return !!(this.args.errors && this.args.errors.length);
  }

  uid = Math.random() * 100 + 1;

  disabled = false;
  inputWrapperClass = null;
  labelClass = null;
  prefix = this.args.prefix || null;
  readonly = false;
  suffix = this.args.suffix || null;
  type = 'text';
  maxlength = null;

  @or('args.prefix', 'args.suffix')
  hasAffix;
}
