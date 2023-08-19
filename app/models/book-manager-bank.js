import Model, { attr, hasMany } from '@ember-data/model';

export default class BookManagerBankModel extends Model {
  @hasMany('deal', { async: true, inverse: 'bookManagerBanks' }) deals;
  @hasMany('tranche', { async: true, inverse: 'bookManagerBanks' }) tranches;

  @attr('string') fullName;
  @attr('string') shortName;
}
