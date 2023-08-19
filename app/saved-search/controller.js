import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class FeedController extends Controller {
  @alias('model') savedSearch;
}
