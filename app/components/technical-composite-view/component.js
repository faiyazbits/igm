import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TechnicalCompositeComponent extends Component {
  @service notify;
  @service feedFactory;
  @tracked feed;

  @action
  async didReceiveAttrs() {
    const destinations = await this.args.technicalComposite.destinations;
    const feedFactory = this.feedFactory;

    feedFactory
      .createFromDestinations(destinations, {
        contentType: 'TechnicalComposite',
        onDashboard: true,
      })
      .then((feed) => {
        this.feed = feed;
      });
  }

  @action
  saveFeed() {
    return this.feed.save().then(
      () => {
        this.notify.success('Feed saved successfully!');
      },
      (errors) => {
        this.notify.alert("Feed couldn't be saved. Please try again.");
      }
    );
  }
}
