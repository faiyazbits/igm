import Controller from '@ember/controller';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { oneWay } from '@ember/object/computed';
import { service } from '@ember/service';

export default class BanksIndexController extends Controller {
  queryParams = ['name'];
  name = '';
  per = 10;
  @service router;
  @service('banks') banksService;

  @oneWay('model.meta.total_pages') totalPages;

  @action
  searchFilter() {
    debounce(this, this.refreshModel, 700);
  }

  refreshModel() {
    this.router.transitionTo({ queryParams: { timestamp: Date.now() } });
  }

  @action
  back() {
    history.back();
  }

  @action
  delete(bank) {
    this.banksService.delete(bank);
  }
}
