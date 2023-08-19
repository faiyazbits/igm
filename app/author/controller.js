import Controller from '@ember/controller';
import { service } from '@ember/service';
import { sort, alias } from '@ember/object/computed';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';

export default class AuthorController extends Controller {
  @service session;
  @service router;

  queryParams = ['authorId', 'name', 'page', 'per'];
  page = 1;
  per = 20;
  authorId = '';
  name = '';
  sortProperties = ['updatedAt:desc'];

  @sort('stories', 'sortProperties')
  sortedStories;
  @alias('model')
  stories;

  @alias('stories.meta.total_pages')
  totalPages;
  @action
  searchFilter() {
    debounce(this, this.refreshModel, 700);
  }

  refreshModel() {
    this.router.transitionTo({ queryParams: { timestamp: Date.now() } });
  }
}
