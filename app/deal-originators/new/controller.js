import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { alias } from '@ember/object/computed';

export default class DealOriginatorsNewController extends Controller {
  @alias('model.dealOriginator')
  dealOriginator;

  @alias('model.dealOriginators')
  dealOriginators;
}
