import { isPresent } from '@ember/utils';
import EmberObject from '@ember/object';

export default class SearchQuery extends EmberObject {
  contentType = 'All';
  couponType = null;
  currency = null;
  dealIdentifier = null;
  dealType = null;
  industryTable = false;
  period = null;
  queryString = null;
  rating = null;
  sfReportCategory = null;

  get isValid() {
    const result = [
      isPresent(this.couponType),
      isPresent(this.currency),
      isPresent(this.dealIdentifier),
      isPresent(this.dealType),
      isPresent(this.destinations),
      isPresent(this.queryString),
      isPresent(this.rating),
    ];

    return result.includes(true);
  }
}
