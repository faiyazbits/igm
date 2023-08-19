import Model, { attr } from '@ember-data/model';

export default class ContactRequestModel extends Model {
  @attr('string') firstName;
  @attr('string') lastName;
  @attr('string') company;
  @attr('string') email;
  @attr('string') phoneNumber;
  @attr('string') city;
  @attr('string') state;
  @attr('string') country;
  @attr('string') commentsAndQuestions;
  @attr('boolean', { defaultValue: false }) productFocusCredit;
  @attr('boolean', { defaultValue: false }) productFocusFx;
  @attr('boolean', { defaultValue: false }) productFocusRates;
}
