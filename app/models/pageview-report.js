import Model, { attr } from '@ember-data/model';

export default class PageviewReportModel extends Model {
  @attr('string') page;
  @attr('number') count;
}
