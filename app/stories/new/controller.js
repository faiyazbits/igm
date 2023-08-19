import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Service from '@ember/service';
import { service } from '@ember/service';

export default class StoriesNewController extends Controller {
  @service router;
  tags = [];
  destinations = [];

  @tracked
  isPreview = false;

  @alias('model') story;

  @action
  cancel() {
    const msg =
      'Your story has not been saved. Are you sure you want to leave this page?';
    const wantsToExit = confirm(msg);

    if (wantsToExit) {
      this.story.rollbackAttributes();
      this.router.transitionTo('author');
    }
  }

  @action
  preview() {
    this.isPreview = !this.isPreview;
  }
}
