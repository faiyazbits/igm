import Route from '@ember/routing/route';
import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class TagsEditRoute extends AuthenticatedRoute {
  @service store;
  @service session;
  @service notify;

  model(params) {
    return this.store.findRecord('tag', params.tag_id);
  }

  async redirect() {
    let user = await this.session.currentUser;
    if (!user.canEditTags) {
      this.notify.alert("You can't do that!");
      this.transitionTo('index');
    }
  }

  @action
  async saveTag(tag) {
    let parentRoute = this.modelFor('tags-route');
  }
}
