import Component from '@glimmer/component';
import { action } from '@ember/object';
import classNames from 'classnames';

export default class UiPopoverContentComponent extends Component {
  get conditionalClassName() {
    let className = classNames({
      'ui-popover-content-inherit-width': this.args.inheritWidth,
      'ui-popover-content-right': this.args.rightPlacement,
      hidden: !this.args.isOpen,
    });

    return 'ui-popover-content ' + className;
  }

  @action
  close() {
    this.args.close();
  }
}