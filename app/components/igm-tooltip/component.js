import { action } from '@ember/object';
import Component from '@glimmer/component';
import tippy from 'tippy.js';
import 'tippy.js/dist/tippy.css';
import 'tippy.js/themes/light.css';

export default class IgmTooltipComponent extends Component {
  duration = 4500;
  maxWidth = 0;
  // maxWidth = 300;
  delay = 1000;

  get text() {
    return this.args.text || '';
  }

  get position() {
    return this.args.position || 'right';
  }

  get event() {
    return this.args.event || 'hover';
  }
  get delay() {
    return this.args.delay || 1000;
  }

  @action
  onInsert(element) {
    tippy(element, {
      content: this.text,
      theme: 'light',
      placement: this.position,
      delay: [this.delay, null],
      offset: [0, 20],
    });
  }
}
