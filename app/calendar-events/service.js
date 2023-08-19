import { action, set } from '@ember/object';
import Service, { service } from '@ember/service';
import { isPresent } from '@ember/utils';
import formattedErrors from '../utils/formatted-errors';

export default class CalendarEventsService extends Service {
  @service notify;
  @service router;
  @service store;

  @action
  async saveCalendarEvent(calendarEvent) {
    // const allDay = calendarEvent.get('allDay');

    // if (allDay) {
    //   const dateTime = calendarEvent.get('dateTime');
    //   set(calendarEvent, 'dateTime', moment(this._generateAllDayDateTime(dateTime)));
    // }

    try{
      await calendarEvent.save();
      this.notify.success("Calendar Event saved sucessfully!");
      this.router.transitionTo('calendar-events.index');
    }
    catch(error){
      this.notify.alert("There was an issue with the provided information.");
    }
  }

  // _generateAllDayDateTime(dt) {
  //   const dateTime = moment(dt).utc();
  //   const month = dateTime.month() + 1;
  //   const date = dateTime.date().toString();
  //   const year = dateTime.year().toString();
  //   const generatedDateTime = month.toString() + "/" + date + "/" + year + " 00:00:00 GMT+0000";

  //   return generatedDateTime;
  // }

  @action
  async deleteCalendarEvent(calendarEvent) {
    try{
      await calendarEvent.destroyRecord();
      this.notify.success("Calendar Event deleted sucessfully!");
      this.router.transitionTo('calendar-events.index');
    }
    catch (error){
      this.notify.alert("Calendar Event could not be deleted.");
    }
  }
}
