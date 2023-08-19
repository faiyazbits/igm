import Service, { service } from '@ember/service';
import { action } from '@ember/object';

export default class DealOriginatorsService extends Service {
  @service notify;
  @service router;

  @action
  async save(dealOriginator) {
    try {
      await dealOriginator.save();
      this.notify.success('Deal Originator saved successfully!');
      this.router.transitionTo('deal-originators.index');
    } catch (e) {
      this.notify.alert("Deal Originator couldn't be saved. Please try again.");
    }
  }

  @action
  async delete(dealOriginator) {
    try {
      await dealOriginator.destroyRecord();
      this.notify.success('Originator deleted successfully!');
      this.router.transitionTo('deal-originators.index');
    } catch (e) {
      this.notify.alert('Originator could not be deleted!');
    }
  }
}
