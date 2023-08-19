import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { htmlSafe } from '@ember/template';
import { action } from '@ember/object';

export default class IRibbonComponent extends Component {
  @tracked
  isExpanded = false;

  get anchorToTop() {
    return this.args.anchorToTop || false;
  }

  get topStyle() {
    if (this.anchorToTop) {
      return htmlSafe('top: 0px;');
    } else {
      return htmlSafe('');
    }
  }

  @action
  toggleExpanded() {
    this.isExpanded = !this.isExpanded;
  }
}
