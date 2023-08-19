import Component from '@glimmer/component';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CalendarEventsEventTypeFilterComponent extends Component {
  
  options = [
    { label: 'All', value: '' },
    { label: 'Event', value: 'event' },
    { label: 'Data', value: 'data' }
  ];

  get selection() {

    let select = this.args.selection;

    if(select == 'event'){
      return { label: 'Event', value: 'event' };
    }
    else if(select == 'data'){
      return { label: 'Data', value: 'data' };
    }
    else{
      return { label: 'All', value: '' };
    }
  }

  set selection(value) {}

  @action
  onSelectionChange(selection) {

    set(this, 'selection', selection);

    this.args.select(selection?.value);
  }
}
