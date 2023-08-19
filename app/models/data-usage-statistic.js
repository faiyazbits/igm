import Model, { attr } from '@ember-data/model';

export default class DataUsageStatisticModel extends Model {
  @attr('number') user_id;
  @attr('string') endpoint;
  @attr('utc') date_time;
  @attr('number') number_of_records;
  @attr('string') parameters;
}
