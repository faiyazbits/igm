import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';
import { action, get, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DealsNewController extends Controller {
  queryParams = ['dealIdentifier'];
  dealIdentifier = 'corporate';

  @alias('model')
  deal;

  @tracked
  isPreview = false;

  @action
  preview() {
    this.isPreview = !this.isPreview;
  }
}
