import AuthenticatedRoute from '../../authenticated/route';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';

export default class CalendarEventsNewRoute extends AuthenticatedRoute {
  @service store;
  @service session;
  @service router;
  @service notify;

  async beforeModel() {
    // super.beforeModel(params);
    const user = await this.session.currentUser;
    if (!user.get('canCreateCalendarEvent')) {
      this.notify.alert("You can't do that!");
      this.router.transitionTo('index');
    }
  }

  model() {
    return this.store.createRecord('calendar-event');
  }

  async setupController(controller, model) {
    super.setupController(controller, model);

    const countries = await this.store.findAll('country');
    controller.set('allCountries', countries);
  }

  @action
  willTransition() {
    var model = this.currentModel;

    if (model.get('isNew')) {
      model.deleteRecord();
    }
  }
}
