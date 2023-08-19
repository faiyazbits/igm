import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import noNullDisplayAmount from '../utils/no-null-display-amount';
import moment from 'moment-timezone';
import { sortBy } from 'lodash';

export default class DealModel extends Model {
  @hasMany('book-manager-bank', { async: true, inverse: 'deals' })
  bookManagerBanks;
  @hasMany('destination', { async: true, inverse: null })
  destinations;
  @belongsTo('distribution', { async: true, inverse: 'deal' }) distribution;
  @belongsTo('deal-originator', { async: true, inverse: 'deal' })
  dealOriginator;
  @belongsTo('issuer', { async: true, inverse: 'deals' }) issuer;
  @hasMany('other-manager-bank', { async: true, inverse: 'deals' })
  otherManagerBanks;
  @hasMany('tranche', { async: true, inverse: 'deal' })
  tranches;
  @belongsTo('user', { async: true, inverse: null }) user;
  @hasMany('story', { async: true, inverse: null }) relatedStories;

  @attr('boolean', { defaultValue: false }) addOn;
  @attr('number') altCurrencyValueEur;
  @attr('number') altGrossProceedsEur;
  @attr('number') amountOffered;
  @attr('number') amountOfferedUsdEquivalent;
  @attr('number') amountOfferedEurEquivalent;
  @attr('string') asianDomestics;
  @attr('string') absAssetClass;
  @attr('string') assetClass;
  @attr('string') averageLife;
  @attr('boolean') babs;
  @attr('string') benchmark;
  @attr('string') bookManagerBanksList;
  @attr('string') bookSize;
  @attr('utc') callDate;
  @attr('boolean') callOption;
  @attr('number') callPrice;
  @attr('string') callProtection;
  @attr('string') callPutComment;
  @attr('string') cdoAssetClass;
  @attr('string') cdoType;
  @attr('string') className;
  @attr('string') collateral;
  @attr('string') commentaryFileUrl;
  @attr() commentaryUrls;
  @attr('string') comments;
  @attr('string') coupon;
  @attr('string') couponType;
  @attr('string') coveredBonds;
  @attr('date') createdAt;
  @attr('string') currency;
  @attr('string') cusip;
  @attr('string') cusip_144a;
  @attr('string') cusipRegs;
  @attr('utc') dateOffered;
  @attr('string') dayCount;
  @attr('string') dbrsOutlook;
  @attr('string') dbrsRating;
  @attr('string') dealIdentifier;
  @attr({
    defaultValue: () => {
      return [];
    },
  })
  dealType;
  @attr('string') denom;
  @attr('number') denomIncrements;
  @attr('number') denomMin;
  @attr('string') dividendProt;
  @attr('number') dividendRate;
  @attr('number') dollarValueUsd;
  @attr('string') eod;
  @attr('utc') eodDate;
  @attr('boolean') equityCall;
  @attr('string') esgSriDealType;
  @attr('string') euRiskRetentionCompliant;
  @attr('string') expectedMaturity;
  @attr('string') fdicGgb;
  @attr('date') feedSortDate;
  @attr('string') figi;
  @attr('utc') firstCouponDate;
  @attr('string') fitchOutlook;
  @attr('string') fitchRating;
  @attr('string') foreignIssuance;
  @attr('string') format;
  @attr('number') fpr;
  @attr('string') frnDiscountMargin;
  @attr('string') governingLaw;
  @attr('string') govtBenchmark;
  @attr('string') govtBmkSpread;
  @attr('number') grossProceeds;
  @attr('string') guarantor;
  @attr('string') highYield;
  @attr('number') hyPostPricingSecondaryPrice;
  @attr('number') igPostPricingSecondarySpread;
  @attr('string') indexLinked;
  @attr('utc') interestAccrualDate;
  @attr('boolean') isPublished;
  @attr('string') isin;
  @attr('string') isin_144a;
  @attr('string') isinRegs;
  @attr('number') issuePrice;
  @attr('string') jcrRating;
  @attr('string') jlmInterest;
  @attr('string') listing;
  @attr('string') market;
  @attr('string') marketType;
  @attr('utc') maturity;
  @attr('string') moodysOutlook;
  @attr('string') moodysRating;
  @attr('number') mufees;
  @attr('number') nics;
  @attr('string') numberOfAccounts;
  @attr('string') otherSecId;
  @attr('string') payment;
  @attr('string') peakBooks;
  @attr('number') pfdParValue;
  @attr('string') priceTalk;
  @attr('string') iptsInitialGuidance;
  @attr('string') guidance;
  @attr('string') iptsToPxd;
  @attr('string') proceedsCategory;
  @attr('boolean') putOption;
  @attr('boolean') rank;
  @attr('string') rating;
  @attr('string') referenceSecurity;
  @attr('boolean') retained;
  @attr('string') riRating;
  @attr('string') securedBond;
  @attr('string') security;
  @attr('boolean', { defaultValue: null }) selfLed;
  @attr('number') sellingConcession;
  @attr('string') sellingRestrictions;
  @attr('string') servicer;
  @attr('utc') settlementDate;
  @attr('number') sharesOffered;
  @attr('string') spOutlook;
  @attr('string') spRating;
  @attr('string') specialServicer;
  @attr('number') spread;
  @attr('string') status;
  @attr('string') stsCompliant;
  @attr('string') subordinatedHybridPreferred;
  @attr('string') swapsBenchmark;
  @attr('string') swapsSpread;
  @attr('string') tefra;
  @attr('string') term;
  @attr('string') tier;
  @attr('string') tierTwo;
  @attr('string') title;
  @attr('number') totalDealSize;
  @attr('number') totalFees;
  @attr('number') totalTranches;
  @attr('string') trancheBookManagers;
  @attr('date') updatedAt;
  @attr('boolean', { defaultValue: false }) upped;
  @attr('string') usRiskRetentionCompliant;
  @attr('string') useOfProceeds;
  @attr('string') valoren;
  @attr('string') wkn;
  @attr('number') xcvrd;
  @attr('string') yield;

  get isSF() {
    return this.dealIdentifier == 'sf';
  }

  get isCorporate() {
    return this.dealIdentifier == 'corporate';
  }

  get displayAmount() {
    const amountOffered = this.amountOffered;
    return noNullDisplayAmount(amountOffered);
  }

  get displayAmountWithCurrency() {
    const amountOffered = this.amountOffered;
    const currency = this.currency;
    return noNullDisplayAmount(amountOffered, currency);
  }

  get displayAmountUSD() {
    const amountOffered = this.amountOfferedUsdEquivalent;
    return noNullDisplayAmount(amountOffered);
  }

  get displayAmountEUR() {
    const amountOffered = this.amountOfferedEurEquivalent;
    return noNullDisplayAmount(amountOffered);
  }

  get displayCallDate() {
    return this.formattedDateOrEmpty(this.callDate);
  }

  get displayCoupon() {
    return this.formattedDateOrEmpty(this.coupon);
  }

  get displayDateOffered() {
    return this.formattedDateOrEmpty(this.dateOffered);
  }

  get displayEodDate() {
    return this.formattedDateOrEmpty(this.eodDate);
  }

  get displayMaturity() {
    return this.formattedDateOrEmpty(this.maturity);
  }

  get displaySettlementDate() {
    return this.formattedDateOrEmpty(this.settlementDate);
  }

  get displayFirstCouponDate() {
    return this.formattedDateOrEmpty(this.firstCouponDate);
  }

  get displayInterestAccrualDate() {
    return this.formattedDateOrEmpty(this.interestAccrualDate);
  }

  get displayTotalDealSize() {
    const currency = this.currency;
    const totalDealSize = this.totalDealSize;
    return noNullDisplayAmount(totalDealSize, currency);
  }

  formattedDateOrEmpty(date) {
    return date ? moment(date).format('DD-MMM-YYYY') : '';
  }

  get headline() {
    const head = `${this.issuer.get('name')} ${this.currency == null ? '(' + this.currency + ')' : this.currency} ${this.displayAmount} ${
      this.displayCoupon
    } ${this.displayMaturity}`;
    return head;
  }

  get moodysAndSpRating() {
    const moodys = this.moodysRating;
    const sp = this.spRating;
    return `${moodys} / ${sp}`;
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

  get sortedTranches() {
    return this.tranches.then((tranches) => sortBy(tranches, ['position']));
  }
}
