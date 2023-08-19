import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class StoryPreviewComponent extends Component {
  currentTime = Date.now();
  @service session;
}
