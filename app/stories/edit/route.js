import Route from '@ember/routing/route';
import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { keys as _keys } from 'lodash';
import { set, get } from '@ember/object';

export default class StoriesEditRoute extends AuthenticatedRoute {
  @service session;
  @service store;
  @service notify;

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
    const user = await this.session.currentUser;
    if (user.isClient) {
      const storyId = params.params['stories.edit'].story_id;
      this.router.transitionTo('stories.show', storyId);
    } else {
      await this.store.findAll('tag');
      await this.store.findAll('destinationGroup');
    }
  }

  model(params) {
    return this.store.findRecord('story', params.story_id);
  }

  @action
  willTransition(transition) {
    const model = this.controller.model;

    if (model.hasDirtyAttributes) {
      const changes = model.changedAttributes();
      if (
        _keys(changes).includes('publishNow') &&
        _keys(changes).length === 1
      ) {
        return true;
      } else {
        const msg =
          'You have unsaved edits. Are you sure you want to leave this page?';
        const wantsToExit = confirm(msg);

        if (wantsToExit) {
          model.rollbackAttributes();
        } else {
          transition.abort();
        }
      }
    } else {
      // Bubble the `willTransition` action so that
      // parent routes can decide whether or not to abort.
      return true;
    }
  }
}
