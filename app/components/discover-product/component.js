import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { computed } from '@ember/object';

export default class DiscoverProduct extends Component {

  attributeBindings = ['data-t'];
  'data-t' = 'discover-product';
  classNames = ['discover-product-section'];


}
