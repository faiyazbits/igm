import Component from '@glimmer/component';
import { service } from '@ember/service';
import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { isPresent } from '@ember/utils';
import { htmlSafe } from '@ember/template';
import moment from 'moment/moment';
import { set, action } from '@ember/object';
import { uniqBy } from 'lodash';
import Sifter from 'sifter';

export default class StoryFormComponent extends Component {
  @service destinations;
  @service store;
  @service router;
  @service session;
  @service notify;
  @service('stories') storyService;

  get tags() {
    return this.store.peekAll('tag');
  }

  get story() {
    return this.args.story;
  }

  get body() {
    return htmlSafe(this.story.body);
  }

  set body(value) {
    this.story.body = value;
  }

  @computed('publishedAtText')
  get isShowingEmbargo() {
    const publishedAtText = this.publishedAtText;
    if (isPresent(publishedAtText)) {
      return true;
    }
  }

  @computed('publishedAtText')
  get publishedAt() {
    const publishedAtText = this.publishedAtText;
    if (isPresent(publishedAtText)) {
      return moment(publishedAtText, 'MM/DD/YYYY hh:mm A');
    }
  }

  @action
  onDestinationChange(selectedDestinations) {
    this.story.destinations = selectedDestinations;
  }

  @action
  onTagsChange(selectedTags) {
    this.story.tags = selectedTags;
  }

  @action
  async selectDestinationGroup(destinationGroup) {
    const existingDestinations = await this.story.destinations;
    const destinations = await destinationGroup.get('destinations');
    const combined = existingDestinations.concat(destinations);
    const deduped = uniqBy(combined, (d) => d.name);
    this.story.destinations = deduped;
  }

  @action
  updateBody(body) {
    this.story.body = body;
  }

  @action
  save() {
    this.storyService.save(this.story);
  }

  @action
  delete() {
    this.storyService.delete(this.story);
  }
  @action
  clone() {
    this.storyService.clone(this.story);
  }

  @action
  publishNow() {
    const publishedAt = this.publishedAt;
    if (!publishedAt) {
      this.storyService.publishNow(this.story);
    } else {
      this.notify.alert('Please use Publish Later or remove the Embargo date.');
    }
  }

  @action
  setEmbargo() {
    const exampleDate = moment()
      .startOf('minute')
      .add(1, 'hour')
      .format('MM/DD/YYYY hh:mm A');
    set(this, 'publishedAtText', exampleDate);
  }

  @action
  revertToDraft() {
    const story = this.story;
    set(this, 'publishedAtText', '');
    set(story, 'publishedAt', null);
    this.storyService.save(this.story);
  }

  @action
  publishLater() {
    const publishedAt = this.publishedAt;
    if (isPresent(publishedAt)) {
      this.storyService.publishLater(this.story, publishedAt);
    } else {
      this.notify.alert('Please use Publish Later or remove the Embargo date.');
    }
  }

  @action
  searchTag(query) {
    let rawTags = this.tags.slice();
    let sifter = new Sifter(rawTags);
    let results = sifter.search(query, {
      fields: ['name'],
      sort: [{ field: 'name', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => this.tags.at(score.id));
    return opts;
  }

  @action
  searchDestinations(query) {
    let rawDestinations = this.destinations.storyDestinations;
    let sifter = new Sifter(rawDestinations);
    let results = sifter.search(query, {
      fields: ['displayName'],
      sort: [{ field: 'displayName', direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => rawDestinations.at(score.id));
    return opts;
  }

  didReceiveAttrs() {
    const publishedAt = this.story.publishedAt;
    if (isPresent(publishedAt)) {
      set(
        this,
        'publishedAtText',
        moment(publishedAt).format('MM/DD/YYYY hh:mm A')
      );
    } else {
      set(this, 'publishedAtText', '');
    }
  }
}
