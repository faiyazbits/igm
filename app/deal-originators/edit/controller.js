import Controller from '@ember/controller';
import { action, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';

export default class DealOriginatorsEditController extends Controller {
  @alias('model.dealOriginator') dealOriginator;
  @alias('model.dealOriginators') dealOriginators;
  @service('deal-originators') DealOriginatorsService;

  @action
  delete(dealOriginator) {
    this.DealOriginatorsService.delete(dealOriginator);
  }
}
