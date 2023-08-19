import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class DealController extends Controller {
  @service session;
  preview = false;
}
