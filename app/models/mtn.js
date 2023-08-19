import Model, { attr } from '@ember-data/model';
import noNullDisplayAmount from '../utils/no-null-display-amount';

export default class MtnModel extends Model {
  @attr('string') issuer;
  @attr('string') classification;
  @attr('string') classificationSubType;
  @attr('string') ccy;
  @attr('number') size;
  @attr('date') maturity;
  @attr('string') settles;
  @attr('string') coupon;
  @attr('number') rate;
  @attr('string') cpnFreq;
  @attr('number') issuePrice;
  @attr('string') dayCount;
  @attr('string') mtnType;
  @attr('string') issueType;
  @attr('string') subordination;
  @attr('string') isin;
  @attr('number') commonCode;
  @attr('date') issueDate;
  @attr('number') instrumentId;
  @attr('string') issueName;


  get displayAmount() {
    const size = this.size;
    return noNullDisplayAmount(size);
  }
}
