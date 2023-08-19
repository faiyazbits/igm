import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action, set, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';

export default class SearchQueryComponent extends Component {
  @service session;
  @service store;
  @service notify;
  @service('search') searchService;

  @tracked
  search = null;

  @action
  searchQueryInserted() {
    this._search();
    this.args.setComponentRef(this);
  }

  @action
  updateSearchQuery() {
    debounce(this, this._search, 200, false);
  }

  _search() {
    const searchService = get(this, 'searchService');
    const searchQuery = get(this, 'args.searchQuery');

    if (searchQuery) {
      const searchServicePromise = searchService.create(searchQuery);
      set(this, 'searchServicePromise', searchServicePromise);

      searchServicePromise.then(
        (search) => {
          set(this, 'search', search);
        },
        () => {
          get(this, 'notify').alert(
            'There was an issue with your search parameters'
          );
        }
      );
    } else {
      set(this, 'search', null);
    }
  }
}
