import Component from '@glimmer/component';
import { action, computed, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { A } from '@ember/array';
import { task, timeout } from 'ember-concurrency';
import { isBlank } from '@ember/utils';

export default class IgmPowerSelectComponent extends Component {
  loadingMessage = 'fetching options....';
  verticalPosition = 'below';
  get selection() {
    return this.args.selection || null;
  }

  get errors() {
    return this.args.errors || A();
  }

  get multiple() {
    return this.args.multiple || false;
  }

  get hasError() {
    return this.errors;
  }

  get optionLabelPath() {
    return this.args.optionLabelPath || null;
  }

  get placeholder() {
    return this.args.placeholder || '';
  }

  get uid() {
    return `input-${this.placeholder}`;
  }

  get renderInPlace() {
    return this.args.renderInPlace || false;
  }

  @action
  onChange(selection) {
    if (!this.args.onChange) {
      throw new Error('onChange action handler for power select is mandatory');
    }
    this.args.onChange(selection);
  }

  @action
  onKeyDown(select, e) {
    if (e.keyCode === 8 && isBlank(e.target.value)) {
      // press backspace on empty searchbox
      select.actions.select(
        select.selected.slice(0, select.selected.length - 1),
        e
      ); // remove last selection
      return false; // prevent usual default behavior
    }
  }
}
