import Component from '@glimmer/component';
import { scheduleOnce } from '@ember/runloop';

export default class IgmClipboardComponent extends Component {
  constructor() {
    super(...arguments);

    scheduleOnce('afterRender', this, this.initClipboard);
  }

  initClipboard() {
    new ClipboardJS('.btn');
  }
}
