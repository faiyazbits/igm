import Route from '@ember/routing/route';
import { set, get } from '@ember/object';
import { action } from '@ember/object';
import { service } from '@ember/service';
import AuthenticatedRoute from '../../authenticated/route';

export default class StoriesNewRoute extends AuthenticatedRoute {
  @service store;
  setupController(controller, model) {
    super.setupController(controller, model);

    set(controller, 'tags', this.store.peekAll('tag'));
    set(
      controller,
      'destinationGroups',
      this.store.peekAll('destinationGroup')
    );
  }

  async beforeModel(params) {
    super.beforeModel(params);
    await this.store.findAll('tag');
    await this.store.findAll('destinationGroup');
  }

  model() {
    return this.store.createRecord('story', {
      publishNow: true,
    });
  }

  @action
  willTransition(transition) {
    const model = get(this, 'controller.model');

    if (model.get('isNew')) {
      const msg =
        'Your story has not been saved. Are you sure you want to leave this page?';
      const wantsToExit = confirm(msg);

      if (wantsToExit) {
        model.deleteRecord();
      } else {
        transition.abort();
      }
    } else {
      // Bubble the `willTransition` action so that
      // parent routes can decide whether or not to abort.
      return true;
    }
  }
}
