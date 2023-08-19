import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { isPresent } from '@ember/utils';
import { service } from '@ember/service';

export default class BanksEditRoute extends AuthenticatedRoute {
  @service store;

  async model(params) {
    const [bank, banks] = await Promise.all([
      this.store.findRecord('bank', params.bank_id),
      this.store.query('bank', { show_all: true }),
    ]);

    return { bank, banks };
  }

  delete() {
    const bank = this.get('controller.bank');

    bank.destroyRecord().then(
      (model) => {
        this.notify.success('Bank deleted successfully!');
        this.transitionTo('banks.index');
      },
      (error) => {
        this.notify.alert('Bank could not be deleted.');
      }
    );
  }

  @action
  willTransition(transition) {
    super.willTransition(transition);
    const bank = this.get('controller.bank');
    if (bank.get('hasDirtyAttributes')) {
      bank.rollbackAttributes();
    }
  }
}
