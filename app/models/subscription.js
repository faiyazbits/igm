import Model, { attr, hasMany } from '@ember-data/model';

export default class SubscriptionModel extends Model {
  @attr('string') name;

  @attr('boolean', { defaultValue: false }) deals;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  deal_databases;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  deal_regions;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  statuses;
  @attr('string') timeframe_number;
  @attr('string') timeframe_period;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  rating_categories;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  industries;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  currencies;
  @attr('string') market;
  @attr('boolean', { defaultValue: false }) distribution_stats;
  @attr('boolean', { defaultValue: false }) nics_data;
  @attr('boolean', { defaultValue: false }) books_data;
  @attr('boolean', { defaultValue: false }) xcvrd;
  @attr('boolean', { defaultValue: false }) ipts_to_pxd;
  @attr('string') snaps_per_day;
  @attr('boolean', { defaultValue: false }) stories;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  stories_by_product;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  stories_by_asset_class;
  @attr('array', {
    defaultValue: function () {
      return [];
    },
  })
  stories_by_region;
  @attr('string', { defaultValue: 'include_chinese' }) chinese_stories;
  @attr('boolean', { defaultValue: false }) technical_analysis;
  @attr('boolean', { defaultValue: false }) calendar_events;

  @attr('date', { serialize: false }) createdAt;
  @attr('date', { serialize: false }) updatedAt;

  @hasMany('user', { async: true, inverse: 'subscription' }) users;
}
