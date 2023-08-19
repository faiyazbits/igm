import Component from '@glimmer/component';
import { service } from '@ember/service';
import ENV from 'igm-upgrade/config/environment';
import { action, get } from '@ember/object';
import { reads } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { pluralize } from 'ember-inflector';
import { dasherize, capitalize } from '@ember/string';

export default class FeedPanelComponent extends Component {
  @service fayeClient;
  @service feedFactory;
  @service notify;
  @service store;

  @tracked searchables;

  @tracked
  isFullScreen = false;

  @tracked
  isShowingStoryBody = false;

  per = 10; // this has to match what's in my-igm

  subscription = null;

  @tracked
  commentaries = null;

  @tracked
  newFeed = null;

  @tracked
  page = 1;

  @tracked
  totalPages;
  @tracked
  per = 10;

  get hasNextPage() {
    return this.page < this.totalPages;
  }

  get hasPreviousPage() {
    return this.page >= 2;
  }

  get rootClassName() {
    let className = 'feed-panel panel panel-default';
    return this.args.isFullScreen
      ? className + ' feed-panel-fullscreen'
      : className;
  }

  get isRealtimeFeedsEnabled() {
    return ENV.featureFlags['realtime-feeds'];
  }

  get feed() {
    return this.args.feed || null;
  }

  set feed(value) {}

  get isAddableFeed() {
    return this.args.isAddableFeed || false;
  }

  get isEditable() {
    return this.args.isEditable || false;
  }

  get destinationNames() {
    return this.feed.get('destinationNames') || Promise.resolve([]);
  }

  get titleLink() {
    const dataType = dasherize(this.feed.get('contentType')) || '';
    return pluralize(dataType);
  }

  constructor() {
    super(...arguments);
    this.subscription = this._subscribeFeed();
    if (this.feed.get('contentType') === 'Technical') {
      this._loadCommentary();
    }
    this._createFeedForDashboard();
    this.totalPages = this.feed.get('totalPages') || 0;
    this.searchables = this.feed.get('searchResults').map((s) => s.searchable);
  }

  willDestroy() {
    const subscription = this.subscription;
    if (isPresent(subscription)) {
      subscription.cancel();
    }
  }

  get isAlertable() {
    const alertable = [
      'technical-composite',
      'isWeeklyOrMonthlyMtn',
      'league-table',
    ].includes(get(this, 'args.dataType.value'));
    return !alertable;
  }

  async _createFeedForDashboard() {
    let contentType = this.feed.get('contentType');
    let destinationNames = await this.destinationNames;

    const newFeed = await this.feedFactory.createFromDestinationNames(
      destinationNames,
      { contentType }
    );
    this.newFeed = newFeed;
  }

  _subscribeFeed() {
    if (!this.subscription) {
      return this.fayeClient.subscribeToSearchQuery(
        this.feed.get('searchQueryId'),
        (searchable) => {
          if (this.page === 1) {
            const searchResultAttrs = {
              searchableType: capitalize(searchable.constructor.modelName),
              searchable,
            };
            const searchResults = this.feed.get('searchResults');
            searchResults.lastObject.setProperties(searchResultAttrs);
            searchResults.unshiftObject(searchResults.popObject());
          }
        }
      );
    }
  }

  async _loadCommentary() {
    const store = this.store;
    const technicalId = this.feed.get('searchResults')[0].get('searchable.id');
    const page = this.page;
    const comments = await store.query('commentary', {
      technical_id: technicalId,
      per: 1,
      page,
    });
    this.commentaries = comments;
    this.totalPages = this.commentaries.meta.total_pages;
  }

  async _refreshModel() {
    if (this.args.feed.get('contentType') === 'Technical') {
      return this._loadCommentary();
    } else if (this.args.feed.get('contentType') === 'Deal') {
      const store = this.store;
      const dealParams = {
        destinations: this.destinationNames,
        page: this.page,
        per: this.per,
        title: this.feed.get('title'),
      };
      const models = await store.query('deal', dealParams);
      this.searchables = models;
      this.totalPages = models.meta.total_pages;
    } else {
      const store = this.store;
      const feedId = this.feed.get('id');
      const params = {
        page: this.page,
        per: this.per,
        id: feedId,
        on_dashboard: true,
      };
      return store.queryRecord('feed', params, feedId);
    }
  }

  @action
  popOut(width = this.$().width(), height = this.$().height()) {
    const strWindowFeatures = `width=${width},height=${height},menubar=no,location=no,resizable=yes,scrollbars=yes,status=yes`;
    const feedId = this.args.feed.get('id');
    window.open(
      `/feed/${feedId}?fullscreen=true`,
      'Headline Viewer',
      strWindowFeatures
    );
  }

  @action
  async saveFeed() {
    try {
      await this.newFeed.save();
      this.notify.success('Feed saved successfully!');
    } catch (errors) {
      this.notify.alert("Feed couldn't be saved. Please try again.");
    }
  }

  @action
  toggleIsShowingStoryBody() {
    this.isShowingStoryBody = !this.isShowingStoryBody;
  }

  @action
  updatePosition() {
    const position = this.position - 1;
    const dashboardItem = this.dashboardItem;
    this.updatePosition(dashboardItem, position);
  }

  @action
  async next() {
    const nextPage = this.page + 1;
    this.page = nextPage;

    const paginatedFeed = await this._refreshModel();
    this.feed = paginatedFeed;
  }

  @action
  async previous() {
    const previousPage = this.page - 1;
    this.page = previousPage;

    const paginatedFeed = await this._refreshModel();
    this.feed = paginatedFeed;
  }
}
