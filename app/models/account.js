import Model, { attr } from '@ember-data/model';

export default class AccountModel extends Model {
  @attr('string') address;
  @attr('string') city;
  @attr('string') country;
  @attr('date', { serialize: false }) createdAt;
  @attr('string') email;
  @attr('string') name;
  @attr('string') phone;
  @attr('string') state;
  @attr('date', { serialize: false }) updatedAt;
  @attr('string') zip;
}
