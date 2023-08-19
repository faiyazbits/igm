import Component from '@glimmer/component';
import { action, get } from '@ember/object';

export default class SavedSearchPanelComponent extends Component {

  @action
  async popOut() {
    console.log(await this.args.results, 'totalPages');
    
  }
}
