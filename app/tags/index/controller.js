import Controller from '@ember/controller';
import { filterBy } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class TagsIndexController extends Controller {
  @service store;
  @service notify;
  @service('tags') tagService;

  @tracked
  isAddingTag = false;

  @tracked
  newTag = null;

  @filterBy('model', 'isNew', false)
  tags;

  @action
  addTag() {
    var newTag = this.store.createRecord('tag');
    this.newTag = newTag;
    this.isAddingTag = true;
  }

  @action
  async cancel() {
    var newTag = this.newTag;
    await newTag.deleteRecord();
    this.newTag = null;
    this.isAddingTag = false;
  }

  @action
  updateNameOfNewTag(name) {
    this.newTag.name = name;
  }

  @action
  async saveTag() {
    const [newTag, error] = await this.tagService.saveTag(this.newTag);
    if (error) {
      this.isAddingTag = true;
    } else {
      this.isAddingTag = false;
    }
  }
}
