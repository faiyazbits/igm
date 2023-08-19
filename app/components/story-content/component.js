import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

export default class StoryContentComponent extends Component {
  // @tracked story = null;

  get story() {
    return this.args.story || null;
  }
}
