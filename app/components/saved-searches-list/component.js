import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action } from '@ember/object';

export default class SavedSearchesListComponent extends Component {
  @service session;
  @service store;

  get addToDashboard() {
    return this.args.addToDashboard || null;
  }

  @action
  delete(search) {
    if (confirm('Are you sure you want delete your saved search?')) {
      this.args.delete(search);
    }
  }

  @action
  selectSearch(search) {
    this.args.selectSearch(search);
  }

  @action
  closeButtonClick() {
    this.args.setSearchOpen(false);
  }
}
