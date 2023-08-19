import Model, { attr } from '@ember-data/model';

export default class ExportModel extends Model {
  @attr('string') exportName;
  @attr() params;
  @attr() results;
}
