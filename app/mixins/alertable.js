import { belongsTo } from '@ember-data/model';
import Mixin from '@ember/object/mixin';

export default Mixin.create({
  alert: belongsTo('alert', { async: true, inverse: 'alertable' }),
});
