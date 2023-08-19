import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class StoriesShowController extends Controller {
  @service
  session;

  @service notify;

  shareUrl = null;
  @alias('session.currentUser')
  user;

  @action
  saveFeed(feed) {
    return feed.save().then(
      () => {
        this.notify.success('Feed saved successfully!');
      },
      (errors) => {
        this.notify.alert("Feed couldn't be saved. Please try again.");
      }
    );
  }

  @action
  back() {
    history.back();
  }
}
