import Controller from '@ember/controller';
import { action } from '@ember/object';
import { alias } from '@ember/object/computed';
import { debounce } from '@ember/runloop';
import { service } from '@ember/service';

export default class DealOriginatorsIndexController extends Controller {
  name = '';
  queryParams = ['name'];
  page = 1;
  per = 20;
  @service router;
  @service('deal-originators') DealOriginatorsService;

  @alias('model.meta.total_pages') totalPages;

  @action
  back() {
    history.back();
  }

  @action
  searchFilter() {
    debounce(this, this.refreshModel, 700);
  }

  refreshModel() {
    this.router.transitionTo({ queryParams: { timestamp: Date.now() } });
  }

  @action
  delete(dealOriginator) {
    this.DealOriginatorsService.delete(dealOriginator);
  }
}
