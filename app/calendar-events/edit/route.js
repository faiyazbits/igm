import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default class CalendarEventsEditRoute extends AuthenticatedRoute {
  @service store;
  @service session;
  @service router;
  @service notify;

  async beforeModel() {
    // super.beforeModel(params);
    const user = await this.session.currentUser;
    if (!user.get('canEditCalendarEvent')) {
      this.notify.alert("You can't do that!");
      this.router.transitionTo('index');
    }
  }

  async model(params) {
    return await this.store.findRecord('calendarEvent', params.id);
  }

  async setupController(controller, model) {
    super.setupController(controller, model);

    const countries = await this.store.findAll('country');
    controller.set('allCountries', countries);
  }

  @action
  willTransition() {
    var model = this.currentModel;

    if (model.get('hasDirtyAttributes')) {
      model.rollbackAttributes();
    }
  }
}
