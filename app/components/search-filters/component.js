import Component from '@glimmer/component';
import { service } from '@ember/service';
import { action, set, get } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class SearchFiltersComponent extends Component {
  @service session;
  @service store;
  @service('search') searchService;
}
