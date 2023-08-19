import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { not } from '@ember/object/computed';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import Sifter from 'sifter';

export default class AddFeedPopoverComponent extends Component {
  eventTypeOptions = [
    { label: 'Event', value: 'event' },
    { label: 'Data', value: 'data' },
  ];

  prefixOptions = ['$', '£', '€', '¥'];
  shouldPickTime = not('calendarEvent.allDay');
  suffixOptions = ['%', 'K', 'B', 'M'];
  volatilityOptions = ['0', '1', '2', '3'];

  get eventType() {
    let select = this.args.calendarEvent.eventType;

    if (select == 'event') {
      return { label: 'Event', value: 'event' };
    } else if (select == 'data') {
      return { label: 'Data', value: 'data' };
    } else {
      return { label: 'Data', value: 'data' };
    }
  }

  get isDeleteable() {
    const calendarEvent = this.args.calendarEvent;

    if (isPresent(calendarEvent)) {
      return !get(calendarEvent, 'isNew');
    } else {
      return false;
    }
  }

  get prefixPlaceholder() {
    const options = get(this, 'prefixOptions').join(', ');
    return `(${options})`;
  }

  get suffixPlaceholder() {
    const options = get(this, 'suffixOptions').join(', ');
    return `(${options})`;
  }

  @action
  onEventTypeChange(selected) {
    this.args.calendarEvent.eventType = selected?.value;
  }

  @action
  cancel() {
    this.args.cancel();
  }

  @action
  delete() {
    if (confirm('Are you sure you want to delete this?')) {
      this.args.delete(this.args.calendarEvent);
    }
  }

  @action
  save() {
    this.args.save(this.args.calendarEvent);
  }

  @action
  makeAllDayEvent() {
    this.args.calendarEvent.allDay = !this.args.calendarEvent.allDay;
  }

  @action
  async searchCountryOptions(query) {
    let countries = await this.args.allCountries;
    let rawOption = countries.slice();
    return this.sifterSearch(query, rawOption, 'name');
  }

  sifterSearch(query, rawOptionList, fieldName) {
    let sifter = new Sifter(rawOptionList);
    let results = sifter.search(query, {
      fields: [fieldName],
      sort: [{ field: fieldName, direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => rawOptionList.at(score.id));
    return opts;
  }
}
