import Model, { attr } from '@ember-data/model';

export default class DataUsageStatisticsAccountModel extends Model {
  @attr('number') user_id;
  @attr('string') account_name;
  @attr('number') account_id;
  @attr('number') number_of_requests;
  @attr('utc') last_request;
  @attr('number') regions_sum;
  @attr('number') deals_sum;
  @attr('number') destinations_sum;
  @attr('number') calendar_events_sum;
  @attr('number') technicals_sum;
  @attr('number') stories_sum;
  @attr('number') countries_sum;
}
