import Controller from '@ember/controller';
import { action, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IssuersEditController extends Controller {
  @alias('model') issuers;
  @service router;
  @service notify;
  @service('issuers') issuersService;

  @action
  async delete() {
    // this.issuersService.delete(this.issuers.issuer);
    try {
      await this.issuer.destroyRecord();
      this.notify.success('Issuer deleted successfully!');
      this.router.transitionTo('issuers.index');
    } catch (error) {
      this.notify.alert('Issuer could not be deleted.');
    }
  }
}
