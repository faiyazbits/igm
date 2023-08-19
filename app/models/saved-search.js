import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { isEmpty } from '@ember/utils';

const queryParamNames = [
  'queryString',
  'contentType',
  'destinationNames',
  'absAssetClass',
  'assetClass',
  'bookManagerBankIds',
  'collateral',
  'countryIds',
  'countryIdsExclude',
  'couponGte',
  'couponLte',
  'couponType',
  'couponTypeExclude',
  'coveredBonds',
  'coveredBondsExclude',
  'currency',
  'currencyExclude',
  'displayCurrency',
  'dateOfferedGte',
  'dateOfferedLte',
  'dealIdentifier',
  'dealOriginatorIds',
  'dealType',
  'dealTypeExclude',
  'distributionStatistics',
  'emergingMarket',
  'emergingMarketExclude',
  'fitchRating',
  'industryIds',
  'industryIdsExclude',
  'industryTable',
  'issuerIds',
  'marketType',
  'marketTypeExclude',
  'maturityGte',
  'maturityLte',
  'moodysRating',
  'period',
  'rating',
  'ratingExclude',
  'relatedStories',
  'selfLed',
  'sendInCSV',
  'sendInExcel',
  'sendInXLSX',
  'sfReportCategory',
  'sfReportType',
  'spRating',
  'status',
  'subordinatedHybridPreferred',
  'subordinatedHybridPreferredExclude',
  'term',
  'termExclude',
  'title',
  'topTwentyOnly',
];

export default class SavedSearchModel extends Model {
  @hasMany('destination', { async: true, embedded: 'always', inverse: null })
  destinations;
  @hasMany('search-result', { async: false, embedded: 'always', inverse: null })
  searchResults;
  @belongsTo('user', { async: true, inverse: null }) user;

  @attr('string', { defaultValue: 'Untitled' }) title;
  @attr('number') totalPages;

  // general search attributes
  @attr('string') queryString;
  @attr('string', { defaultValue: 'All' }) contentType;

  // deal search attributes
  @attr() absAssetClass;
  @attr() assetClass;
  @attr() bookManagerBankIds;
  @attr() collateral;
  @attr() countryIds;
  @attr() countryIdsExclude;
  @attr() couponGte;
  @attr() couponLte;
  @attr() couponType;
  @attr() couponTypeExclude;
  @attr() coveredBonds;
  @attr() coveredBondsExclude;
  @attr() currency;
  @attr() currencyExclude;
  @attr() displayCurrency;
  @attr() dateOfferedGte;
  @attr() dateOfferedLte;
  @attr() dealIdentifier;
  @attr() dealOriginatorIds;
  @attr() dealType;
  @attr() dealTypeExclude;
  @attr() distributionStatistics;
  @attr() emergingMarket;
  @attr() emergingMarketExclude;
  @attr() fitchRating;
  @attr() industryIds;
  @attr() industryIdsExclude;
  @attr() industryTable;
  @attr() issuerIds;
  @attr() marketType;
  @attr() marketTypeExclude;
  @attr() maturityGte;
  @attr() maturityLte;
  @attr() moodysRating;
  @attr() period;
  @attr() rating;
  @attr() ratingExclude;
  @attr() relatedStories;
  @attr() selfLed;
  @attr() sendInCSV;
  @attr() sendInExcel;
  @attr() sendInXLSX;
  @attr() sfReportCategory;
  @attr() sfReportType;
  @attr() spRating;
  @attr() status;
  @attr() subordinatedHybridPreferred;
  @attr() subordinatedHybridPreferredExclude;
  @attr() term;
  @attr() termExclude;
  @attr() topTwentyOnly;

  get destinationNames() {
    return this.destinations.then((destinations) =>
      destinations.map((d) => d.name)
    );
  }

  get queryParams() {
    let params = {};
    queryParamNames.forEach((key) => {
      params[key] = this[key];
    });
    return params;
  }

  get isCorporate() {
    return this.dealIdentifier == 'corporate';
  }

  get isDealSearch() {
    return !isEmpty(this.dealIdentifier);
  }
}
