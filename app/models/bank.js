import Model, { attr } from '@ember-data/model';

export default class BankModel extends Model {
  @attr('date') deletedAt;
  @attr('string') fullName;
  @attr('string') fullNameEur;
  @attr('string') headquarters;
  @attr('number') mergerId;
  @attr('string') mergerName;
  @attr('date') mergerOn;
  @attr('string') secondName;
  @attr('string') shortName;
  @attr('string') thirdName;
  @attr('string') lei;
}
