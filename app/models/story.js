import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed, set } from '@ember/object';
import { service } from '@ember/service';
import { memberAction } from 'ember-api-actions';
import { map } from 'lodash';
import { A } from '@ember/array';
import moment from 'moment-timezone';
import { isPresent } from '@ember/utils';
import SearchableMixin from '../mixins/searchable';

export default class StoryModel extends Model.extend(SearchableMixin) {
  @hasMany('destination', { async: true, inverse: null }) destinations;
  @hasMany('tag', { async: true, inverse: null }) tags;
  @belongsTo('user', { async: true, inverse: null }) user;

  @attr('string') body;
  @attr('date', { serialize: false }) createdAt;
  @attr('string') description;
  @attr('date') feedSortDate;
  @attr('string') headline;
  @attr('boolean', { defaultValue: false }) publishNow;
  @attr('date') publishedAt;
  @attr('boolean', { defaultValue: false }) resendAlerts;
  @attr('date', { serialize: false }) updatedAt;
  @attr('boolean') webOnly;

  _mlt = memberAction({ path: 'mlt' });

  get relatedStories() {
    const storiesPromise = new Promise((resolve, reject) => {
      this._mlt().then((results) => {
        this.store.pushPayload(results);

        const stories = map(results.stories, (story) => {
          return this.store.peekRecord('story', story.id);
        });

        resolve(stories);
      });
    });

    return storiesPromise.then((stories) => {
      return A(stories).sortBy('createdAt').reverse();
    });
  }

  get isEmbargoed() {
    const publishedAt = this.publishedAt;
    const isPublishedInFuture = publishedAt > moment();

    return isPresent(publishedAt) && isPublishedInFuture;
  }

  get isPublished() {
    const publishedAt = this.publishedAt;
    const isPublishedInPast = publishedAt <= moment();

    return isPresent(publishedAt) && isPublishedInPast;
  }

  get sendToVendors() {
    return !this.webOnly;
  }

  set sendToVendors(value) {
    set(this, 'webOnly', !value);
    return value;
  }
}
