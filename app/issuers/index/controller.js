import Controller from '@ember/controller';
import { action } from '@ember/object';
import { debounce } from '@ember/runloop';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { alias } from '@ember/object/computed';

export default class IssuersIndexController extends Controller {
  @service('issuers') issuersService;
  @service router;
  @alias('model') issuers;
  @tracked name;
  queryParams = ['name'];
  @alias('model.meta.total_pages') totalPages;
  per = 20;
  page = 1;

  @action
  back() {
    history.back();
  }

  @action
  delete(issuer) {
    this.issuersService.delete(issuer);
  }

  @action
  searchFilter() {
    debounce(this, this.refreshModel, 700);
  }

  refreshModel() {
    this.router.transitionTo({ queryParams: { timestamp: Date.now() } });
  }
}
