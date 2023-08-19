import Service, { service } from '@ember/service';
import { action } from '@ember/object';

export default class RelatedStoriesService extends Service {
  @service store;

  @action
  async addRelatedStory(deal, storyId) {
    const relatedStory = await this.store.findRecord('story', storyId);
    deal.relatedStories.then((relatedStories) => {
      relatedStories.addObject(relatedStory);
    });
  }

  @action
  deleteRelatedStory(deal, story) {
    deal.relatedStories.then((relatedStories) => {
      relatedStories.removeObject(story);
    });
  }
}
