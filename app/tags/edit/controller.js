import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class TagsEditController extends Controller {
  @service tags;
  @service router;

  @action
  async deleteTag(tag) {
    if (confirm('Are you sure you want to delete this?')) {
      await this.tags.deleteTag(tag);
    }
  }

  @action
  async saveTag(tag) {
    const [newTag, error] = await this.tags.saveTag(tag);
    if (!error) {
      this.router.transitionTo('tags.index');
    }
  }
}
