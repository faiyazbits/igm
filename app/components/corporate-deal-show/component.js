import Component from '@glimmer/component';
import { oneWay } from '@ember/object/computed';

export default class CorporateDealShowComponent extends Component {
  @oneWay('attrs.deal') deal;
}
