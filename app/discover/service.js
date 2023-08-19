import Service from '@ember/service';
import { service } from '@ember/service';




export default class DiscoverService extends Service {
  @service notify;
  @service store;
  @service session;
  @service router;


  async save(feed) {
    try {
      await feed.save();
      this.notify.success('Feed saved successfully!');
      this.router.transitionTo('discover');
      // this.refresh();
      // this.router.transitionTo({ queryParams: { timestamp: Date.now() } });
    }catch (e) {
      this.notify.alert("Feed couldn't be saved. Please try again.");
    }
  }

  async delete(feed) {
    if (confirm('Are you sure you want to delete this feed?')) {
      try {
        await feed.destroyRecord();
        this.notify.success('Feed deleted successfully!');
        this.router.transitionTo('discover');
      } catch (e) {
        this.notify.alert('Feed could not be deleted!');
      }
    }
  }

}
