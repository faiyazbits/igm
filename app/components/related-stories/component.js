import Component from '@glimmer/component';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';

export default class RelatedStoriesComponent extends Component {
  @service RelatedStories;

  @action
  addLink() {
    const newStoryUrl = this.newStoryUrl;

    if (newStoryUrl.match(/\d+$/)) {
      const storyId = parseInt(newStoryUrl.match(/\d+$/)[0], 10);
      this.RelatedStories.addRelatedStory(this.args.deal, storyId);
      set(this, 'newStoryUrl', '');
    }
  }

  @action
  removeLink(story) {
    this.RelatedStories.deleteRelatedStory(this.args.deal, story);
  }
}
