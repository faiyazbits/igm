import Model, { attr } from '@ember-data/model';

export default class DestinationModel extends Model {
  @attr('string') contentType;
  @attr('string') destinationType;
  @attr('string') displayName;
  @attr('string') name;
  @attr() categories;
}
