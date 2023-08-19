import Service from '@ember/service';
import { service } from '@ember/service';
import { get, set } from '@ember/object';
import { getProperties, setProperties } from '@ember/object';

export default class StoriesService extends Service {
  @service notify;
  @service store;
  @service session;
  @service router;

  async deleteDestinationGroup(group) {
    try {
      await group.destroyRecord();
      this.notify.success('Destination group was deleted successfully!');
    } catch (e) {
      this.notify.alert('Destination group could not be deleted!');
    }
  }

  async saveDestinationGroup(group) {
    try {
      await group.save();
      this.notify.success('Destination group was saved successfully!');
    } catch (e) {
      this.notify.alert('Destination group could not be saved!');
    }
  }

  addDestinationGroup() {
    this.store.createRecord('destination-group');
  }

  async publishNow(story) {
    story.publishNow = true;
    try {
      await story.save();
      story.publishNow = false;
      this.notify.success('Story published successfully!');
      this.router.transitionTo('stories.edit', story.id);
    } catch (e) {
      this.notify.alert('Story could not be published!');
    }
  }

  async save(story) {
    const msg = story.isPublished ? 'published' : 'saved';
    try {
      story.publishNow = false;
      await story.save();
      set(story, 'resendAlerts', false);
      this.notify.success(`Story ${msg} successfully!`);
      this.router.transitionTo('stories.edit', story.id);
    } catch (e) {
      this.notify.alert('Story could not be saved!');
    }
  }

  async publishLater(story, publishedAt) {
    story.publishedAt = publishedAt.toDate();
    try {
      story.publishNow = false;
      await story.save();
      this.notify.success(
        `Story will publish on ${publishedAt.format('MMM-D-YYYY H:mm')}!`
      );
      this.router.transitionTo('stories.edit', story.id);
    } catch (e) {
      this.notify.alert('Story could not be published!');
    }
  }
  async delete(story) {
    if (confirm('Are you sure you want to delete this story?')) {
      try {
        await story.destroyRecord();
        this.notify.success('Story deleted successfully!');
        this.router.transitionTo('author');
      } catch (e) {
        this.notify.alert('Story could not be deleted!');
      }
    }
  }

  async clone(story) {
    try {
      const cloneStory = {
        destinations: story.destinations,
        tags: story.tags,
        user: story.user,
        body: story.body,
        createdAt: story.createdAt,
        description: story.description,
        feedSortDate: story.feedSortDate,
        headline: story.headline,
        publishNow: story.publishNow,
        publishedAt: story.publishedAt,
        resendAlerts: story.resendAlerts,
        updatedAt: story.updatedAt,
        webOnly: story.webOnly,
      };

      const clonedModel = this.store.createRecord('story');

      clonedModel.setProperties({
        user: cloneStory.user,
        body: cloneStory.body,
        createdAt: cloneStory.createdAt,
        description: cloneStory.description,
        feedSortDate: cloneStory.feedSortDate,
        headline: cloneStory.headline,
        publishNow: cloneStory.publishNow,
        publishedAt: null,
        resendAlerts: cloneStory.resendAlerts,
        updatedAt: cloneStory.updatedAt,
        webOnly: true,
      });

      cloneStory.destinations.then((destination) => {
        clonedModel.destinations = destination;
      });

      cloneStory.tags.then((tag) => {
        clonedModel.tags = tag;
      });

      await clonedModel.save();

      this.notify.success(
        'Story cloned successfully, you are now editing the clone!'
      );
      this.router.transitionTo('stories.edit', clonedModel.id);
    } catch (e) {
      this.notify.alert('Story could not be cloned!');
    }
  }
}
