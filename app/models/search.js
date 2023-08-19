import Model, { attr, hasMany } from '@ember-data/model';

export default class SearchModel extends Model {
  @hasMany('search-result', { async: true, inverse: 'search' }) searchResults;

  @attr() aggregations;
  @attr() params;
  // TODO Can this be moved into searchResults?
  @attr() leagueTable;
  @attr() resultCountByProduct;
  @attr() resultCountByType;
  @attr('number') totalCount;
  @attr('number') totalPages;

  @attr() query;
}
