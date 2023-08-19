import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { isPresent } from '@ember/utils';
import { sortBy } from 'lodash';

export default class IssuerModel extends Model {
  @hasMany('deal', { async: true, inverse: 'issuer' }) deals;
  @belongsTo('country', { async: true, inverse: 'issuers' }) country;
  @belongsTo('industry', { async: true, inverse: 'issuers' }) industry;
  @belongsTo('issuer', { async: true, inverse: null }) merger;

  @attr('string') business;
  @attr('string') dealType;
  @attr('date') deletedAt;
  @attr('string') industryEurCategory;
  @attr('string') industryUsCategory;
  @attr('boolean') isAgency;
  @attr('boolean') isEmergingMarket;
  @attr('boolean') isSovGovt;
  @attr('number') legacyId;
  @attr('string') lei;
  @attr('number') mergerId;
  @attr('string') mergerName;
  @attr('string') name;
  @attr('string') nickname;
  @attr('string') sector;
  @attr('string') ticker;

  industries = [];

  get sortedIndustries() {
    return sortBy(this.industries, [
      'name',
      'industryClass',
      'industrySubclass',
    ]);
  }

  get displayName() {
    const name = this.name;
    const nickname = this.nickname;
    if (isPresent(nickname)) {
      return nickname;
    } else {
      return name;
    }
  }
}
