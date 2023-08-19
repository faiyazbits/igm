import Model, { attr, hasMany } from '@ember-data/model';
import { computed, get } from '@ember/object';

export default class IndustryModel extends Model {
  @hasMany('issuer', { async: true, inverse: 'industry' }) issuers;

  @attr('string') name;
  @attr('string') industryClass;
  @attr('string') industrySubclass;

  get displayName() {
    var name = this.name;
    var industryClass = this.industryClass;
    var industrySubclass = this.industrySubclass;

    if (name && industryClass && industrySubclass) {
      return `${name} / ${industryClass} / ${industrySubclass}`;
    } else if (name && industryClass) {
      return `${name} / ${industryClass}`;
    } else {
      return name;
    }
  }
}
