import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StoriesEditController extends Controller {
  @tracked
  isPreview = false;

  @alias('model') story;

  @action
  preview() {
    this.isPreview = !this.isPreview;
  }

  @action
  back() {
    history.back();
  }
}
