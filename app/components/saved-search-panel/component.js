import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { oneWay } from '@ember/object/computed';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SavedSearchPanelComponent extends Component {
  @tracked isFullScreen = this.args.isFullScreen || false;
  @tracked page = 1;
  per = 10;
  @tracked totalPages = null;
  @service() store;
  @oneWay('args.savedSearch.totalPages') totalPages;
  @oneWay('args.savedSearch.isCorporate') isCorporate;

  get width() {
    return window.innerWidth;
  }

  get height() {
    return window.innerHeight;
  }

  get hasNextPage() {
    return this.page < this.totalPages;
  }

  get hasPreviousPage() {
    return this.page >= 2;
  }

  get alertPopOverContent() {
    const savedSearch = this.savedSearch.then((search) => {
      return search;
    });

    return savedSearch || null;
  }

  get savedSearch() {
    return this.args.savedSearch || null;
  }

  set savedSearch(value) {}

  @action
  async popOut(width = this.width, height = this.height) {
    const strWindowFeatures = `width=${width},height=${height},menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes`;
    const savedSearchId = this.args.savedSearch.get('id');
    window.open(
      `/saved-search/${savedSearchId}`,
      'Headline Viewer',
      strWindowFeatures
    );
  }

  @action
  async goToSavedSearch() {
    const savedSearch = this.args.savedSearch;
    const queryParams = get(savedSearch, 'queryParams');
    const destinations = get(savedSearch, 'destinations');
    queryParams.destinations = destinations.map((destination) => {
      return get(destination, 'name');
    });

    this.args.goToSavedSearch(queryParams);
  }

  @action
  async next() {
    const nextPage = this.page + 1;
    this.page = nextPage;

    const refreshSavedSearch = await this._refreshModel();
    this.savedSearch = refreshSavedSearch;
  }

  @action
  async previous() {
    const previousPage = this.page - 1;
    this.page = previousPage;

    const refreshSavedSearch = await this._refreshModel();
    this.savedSearch = refreshSavedSearch;
  }

  async _refreshModel() {
    const store = this.store;
    const savedSearchId = this.args.savedSearch.get('id');
    const params = {
      page: this.page,
      per: this.per,
      id: savedSearchId,
    };

    return await store.queryRecord('savedSearch', params, savedSearchId);
  }
}
