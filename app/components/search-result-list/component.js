import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action, set, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchResultListComponent extends Component {
  @service session;
  @service store;
  @service('search') searchService;

  @tracked
  page = 1;

  @tracked
  totalPages = this.args.totalPages || 0;

  @tracked
  per = 10;

  get hasNextPage() {
    return this.page < this.totalPages;
  }

  get hasPreviousPage() {
    return this.page >= 2;
  }

  @action
  next() {
    const nextPage = get(this, 'page') + 1;
    set(this, 'page', nextPage);

    this._refreshModel();
  }

  @action
  previous() {
    const previousPage = get(this, 'page') - 1;
    set(this, 'page', previousPage);

    this._refreshModel();
  }

  _refreshModel() {
    const params = {
      page: get(this, 'page'),
    };

    get(this, 'args.changePage')(params);
    this.args.updateSearchQuery();
  }
}
