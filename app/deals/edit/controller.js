import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { alias } from '@ember/object/computed';

export default class DealsEditController extends Controller {
  @alias('model') deal;
  @tracked isPreview = false;

  @action
  preview() {
    this.isPreview = !this.isPreview;
  }
}
