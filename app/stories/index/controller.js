import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { sort, alias } from '@ember/object/computed';

export default class StoriesIndexController extends Controller {
  queryParams = ['destinations', 'tag', 'title'];
  page = 1;
  per = 20;

  destinations = [];
  tag = [];

  @tracked
  isShowingStoryBody = false;
  @sort('model', 'sortProperties')
  sortedStories;
  sortProperties = ['updatedAt:desc'];
  @alias('model')
  stories;
  @tracked title = 'Headlines';
  @alias('model.meta.total_pages')
  totalPages;

  @action
  toggleShowingStoryBody() {
    this.isShowingStoryBody = !this.isShowingStoryBody;
  }
}
