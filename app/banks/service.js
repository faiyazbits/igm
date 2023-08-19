import Service, { service } from '@ember/service';
import { action } from '@ember/object';

export default class BanksService extends Service {
  @service notify;
  @service router;

  @action
  async save(bank) {
    try {
      await bank.save();
      this.notify.success('Bank saved successfully!');
      this.router.transitionTo('banks.index');
    } catch (e) {
      this.notify.alert("Bank couldn't be saved. Please try again.");
    }
  }

  @action
  async delete(bank) {
    try {
      await bank.destroyRecord();
      this.notify.success('Bank deleted successfully!');
      this.router.transitionTo('banks.index');
    } catch (e) {
      this.notify.alert('Bank could not be deleted.');
    }
  }
}
