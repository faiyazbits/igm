import Controller from '@ember/controller';
import { action, set, get, getProperties } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isEmpty } from '@ember/utils';
import SearchQuery from '../models/search-query';

export default class SearchController extends Controller {
  @service store;
  @service session;
  @service notify;
  @service router;

  get user() {
    return this.session.currentUser;
  }

  queryParams = [
    'contentType',
    'page',
    'perPage',
    'queryString',
    'destinations',
  ];

  get hasQuery() {
    return !isEmpty(this.queryString);
  }

  get searches() {
    return this.savedSearches.filter((s) => s.dealIdentifier == null);
  }

  @tracked
  searchQueryComponentRef;

  @tracked
  contentType = 'All';

  @tracked
  savedSearches = [];

  @tracked
  page = 1;

  @tracked
  perPage = 7;

  @tracked
  queryString = '';

  @tracked
  destinations = [];

  @tracked
  dealIdentifier = null;

  @tracked
  clDestination = null;

  @tracked
  creditDestination = null;

  @tracked
  fxDestination = null;

  @tracked
  iiiaDestination = null;

  @tracked
  noDestination = null;

  @tracked
  ratesDestination = null;

  @tracked
  g10FxPlaybookDestination = null;

  @tracked
  searchQuery = null;

  init() {
    super.init();
    this.setSearchQuery();
    this.addQueryParamsObservers();
    set(this, 'clDestination', ['cl']);
    set(this, 'creditDestination', ['credit']);
    set(this, 'fxDestination', ['fx']);
    set(this, 'iiiaDestination', ['iiia']);
    set(this, 'noDestination', []);
    set(this, 'ratesDestination', ['rates']);
    set(this, 'g10FxPlaybookDestination', ['g10 fx playbook']);
  }

  setSearchQuery() {
    const queryParams = get(this, 'queryParams');
    const queryParamsWithValues = getProperties(this, ...queryParams);
    const searchQuery = SearchQuery.create(queryParamsWithValues);
    set(this, 'searchQuery', searchQuery);
  }

  addQueryParamsObservers() {
    const queryParams = get(this, 'queryParams');

    queryParams.forEach((queryParam) => {
      this.addObserver(queryParam, this, 'setSearchQuery');
    });
  }

  @action
  changePage(params) {
    set(this, 'page', params.page);
  }

  @action
  setComponentRef(componentRef) {
    set(this, 'searchQueryComponentRef', componentRef);
  }

  @action
  saveSearch() {
    this.contentType = 'king';
  }

  @action
  addToDashboard(savedSearch) {
    let dashboardItem = this.store.createRecord('dashboardItem', {
      dashboardable: savedSearch,
    });

    dashboardItem.save().then(
      (dashboardItem) => {
        this.notify.success(
          'Saved search added to your dashboard successfully!'
        );
      },
      () => {
        this.notify.alert('Saved search could not be added to your dashboard.');
      }
    );
  }

  @action
  goToSavedSearch(savedSearch) {
    const savedSearchProperties = getProperties(savedSearch, 'queryParams');

    this.router.transitionTo('search', {
      queryParams: savedSearchProperties.queryParams,
    });
  }

  @action
  deleteSearch(savedSearch) {
    savedSearch.destroyRecord().then(
      (savedSearch) => {
        this.notify.success('Saved search deleted successfully!');
      },
      (error) => {
        this.notify.alert('Saved search could not be deleted.');
      }
    );
  }
}
