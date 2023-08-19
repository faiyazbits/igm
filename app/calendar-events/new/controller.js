import Controller from '@ember/controller';
import { action, get } from '@ember/object';
import moment from 'moment/moment';
import { service } from '@ember/service';

export default class CalendarEventsNewController extends Controller {
  @service router;
  @service notify;
  @service CalendarEvents;

  @action
  async toggleAllDay() {
    const calendarEvent = await get(this, 'model');
    calendarEvent.allDay = !calendarEvent.allDay;
  }

  @action
  cancel() {
    this.router.transitionTo('calendar-events.index');
  }

  @action
  saveCalendarEvent(calendarEvent) {
    this.CalendarEvents.saveCalendarEvent(calendarEvent);
  }
}
