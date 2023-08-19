import Route from '@ember/routing/route';
import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TagsIndexRoute extends AuthenticatedRoute {
  @service store;
  model() {
    return this.store.findAll('tag');
  }
}
