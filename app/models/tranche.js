import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import noNullDisplayAmount from '../utils/no-null-display-amount';
import { compact } from 'lodash';

export default class TrancheModel extends Model {
  @belongsTo('deal', { async: true, inverse: 'tranches' }) deal;
  @hasMany('book-manager-bank', { async: true, inverse: 'tranches' })
  bookManagerBanks;
  @hasMany('destination', { async: true, inverse: null }) destinations;
  @hasMany('other-manager-bank', { async: true, inverse: 'tranches' })
  otherManagerBanks;

  @attr('number') amountOffered;
  @attr('string') averageLife;
  @attr('string') benchmark;
  @attr('string') callComment;
  @attr('utc') callDate;
  @attr('boolean') callOption;
  @attr('string') callProtection;
  @attr('string') className;
  @attr('string') coupon;
  @attr('string') couponType;
  @attr('date') createdAt;
  @attr('string') creditEnhancement;
  @attr('string') currency;
  @attr('string') cusip;
  @attr('string') cusip_144a;
  @attr('string') cusipRegs;
  @attr('utc') dateOffered;
  @attr('string') dbrsRating;
  @attr('string') discountMargin;
  @attr('utc') expectedMaturity;
  @attr('string') figi;
  @attr('string') fitchRating;
  @attr('number') fpr;
  @attr('string') guarantor;
  @attr('string') isin;
  @attr('string') isin_144a;
  @attr('string') isinRegs;
  @attr('number') issuePrice;
  @attr('string') kroll;
  @attr('utc') legalMaturity;
  @attr('string') moodysRating;
  @attr('string') morningstar;
  @attr('number') position;
  @attr('string') priceTalk;
  @attr('boolean', { defaultValue: true }) rank;
  @attr('string') rating;
  @attr('boolean') retained;
  @attr('string') spRating;
  @attr('number') spread;
  @attr('string') trancheComments;
  @attr('string') window;
  @attr('string') yield;

  get displayAmount() {
    const amountOffered = this.amountOffered;
    return noNullDisplayAmount(amountOffered);
  }

  get displayRatings() {
    const moodys = this.moodysRating;
    const sp = this.spRating;
    const fitch = this.fitchRating;
    const dbrs = this.dbrsRating;
    let ratings = [moodys, sp, fitch, dbrs];
    ratings = compact(ratings).join(' / ');
    return ratings;
  }

  get regions() {
    return this.destinations.then((destinations) =>
      destinations.filter((destination) => {
        const isRegionDest = destination.destinationType === 'region';
        const isNotAmericas = destination.displayName !== 'AMERICAS';
        return isRegionDest && isNotAmericas;
      })
    );
  }
}
