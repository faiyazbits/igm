import Model, { attr, hasMany } from '@ember-data/model';

export default class OtherManagerBankModel extends Model {
  @hasMany('deal', { async: true, inverse: 'otherManagerBanks' }) deals;
  @hasMany('tranche', { async: true, inverse: 'otherManagerBanks' }) tranches;

  @attr('string') fullName;
  @attr('string') shortName;
}
