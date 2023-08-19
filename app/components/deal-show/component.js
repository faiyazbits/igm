import Component from '@glimmer/component';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class DealShowComponent extends Component {
  @service session;
  @alias('session.currentUser') user;

  @action
  back() {
    history.back();
  }

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
}
