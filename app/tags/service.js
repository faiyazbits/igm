import Service from '@ember/service';
import { service } from '@ember/service';

export default class TagsService extends Service {
  @service store;
  @service session;
  @service notify;
  @service router;

  async deleteTag(tag) {
    try {
      await tag.destroyRecord();
      this.notify.success('Tag deleted successfully!');
      this.router.transitionTo('tags.index');
    } catch (e) {
      this.notify.alert("Tag couldn't be deleted. Please try again.");
    }
  }

  async saveTag(tag) {
    try {
      const newTag = await tag.save();
      this.notify.success('Tag saved successfully!');
      return [newTag, null];
    } catch (e) {
      this.notify.alert("Tag couldn't be saved. Please try again.");
      return [null, e];
    }
  }
}
