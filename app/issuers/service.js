import Service, { service } from '@ember/service';
import { action } from '@ember/object';
import formattedErrors from '../utils/formatted-errors';

export default class IssuersService extends Service {
  @service notify;
  @service router;

  @action
  async save(issuer) {
    try {
      await issuer.save();
      this.notify.success('Issuer saved successfully!');
      this.router.transitionTo('issuers.index');
    } catch (e) {
      this.notify.alert("Issuer couldn't be saved. Please try again.");
    }
  }

  @action
  async delete(issuer) {
    if (
      confirm(
        'Are you sure you want to delete this issuer? Click OK to continue.'
      )
    ) {
      try {
        await issuer.destroyRecord();
        this.notify.success('Issuer deleted successfully!');
      } catch (errors) {
        issuer.rollbackAttributes();
        // this.refresh();
        this.notify.alert(formattedErrors(errors));
      }
    }
  }
}
