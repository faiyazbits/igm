import Component from '@glimmer/component';
import { service } from '@ember/service';

export default class AuthorNavComponent extends Component {
  @service session;
}
