import { action, set } from '@ember/object';
import Service, { service } from '@ember/service';
import { isPresent } from '@ember/utils';
import formattedErrors from '../utils/formatted-errors';

export default class DealsService extends Service {
  @service notify;
  @service router;
  @service http;
  @service store;

  @action
  async saveCorporate(deal, isPublished) {
    set(deal, 'dealIdentifier', 'corporate');
    set(deal, 'isPublished', isPublished);

    try {
      await deal.save();
      const distribution = await deal.distribution;
      if (isPresent(distribution)) {
        await distribution.save();
      }
      this.notify.success('Corporate Deal saved successfully');
      this.router.transitionTo('deals.edit', deal.id);
    } catch (errors) {
      this.notify.alert(formattedErrors(errors));
    }
  }

  @action
  async saveSF(deal, isPublished) {
    set(deal, 'dealIdentifier', 'sf');
    set(deal, 'isPublished', isPublished);

    try {
      if (deal.get('isNew')) {
        await deal.save();
        const tranches = await deal.tranches;
        await tranches.save();
      } else {
        // When the deal is being edited, we must save the tranches
        // first. Otherwise, the old tranche data comes back from the
        // server and the local ember data objects get updated before
        // the tranches are saved. But, the fact that only the
        // async relationships on the tranches change is suspect.
        // I think it's because the serializers are specifying
        // to serialize ids.
        const tranches = await deal.tranches;
        await tranches.save();
        await deal.save();
      }

      this.notify.success('SF Deal saved successfully');
      this.router.transitionTo('deals.edit', deal.id);
    } catch (e) {
      this.notify.alert(formattedErrors(e));
    }
  }

  @action
  clone(deal) {
    return new Promise((resolve) => {
      try {
        const response = this.http.fetchData(`/api/v1/deal_clones`, 'POST', {
          deal_id: deal.id,
        });
        response.then((result) => {
          this.notify.success(
            'Deal cloned successfully. You are now editing the cloned deal!'
          );
          this.router.transitionTo('deals.edit', result.deal.id);

          resolve(result);
        });
      } catch (e) {
        this.notify.alert('Unable to clone deal.');
      }
    });
  }

  @action
  async delete(deal) {
    try {
      await deal.destroyRecord();
      this.notify.success('Deal deleted successfully!');
      this.router.transitionTo('deals.index');
    } catch (e) {
      this.notify.alert('Deal could not be deleted!');
    }
  }

  @action
  async deleteTranche(tranche) {
    try {
      await tranche.destroyRecord();
      this.notify.success('Tranche deleted successfully.');
    } catch (e) {
      this.notify.alert('Unable to delete tranche.');
    }
  }

  @action
  cloneTranche(deal, tranche, position) {
    const cloneTranche = {
      deal: tranche.deal,
      bookManagerBanks: tranche.bookManagerBanks,
      destinations: tranche.destinations,
      otherManagerBanks: tranche.otherManagerBanks,
      amountOffered: tranche.amountOffered,
      averageLife: tranche.averageLife,
      benchmark: tranche.benchmark,
      callComment: tranche.callComment,
      callDate: tranche.callDate,
      callOption: tranche.callOption,
      callProtection: tranche.callProtection,
      className: tranche.className,
      coupon: tranche.coupon,
      couponType: tranche.couponType,
      createdAt: tranche.createdAt,
      creditEnhancement: tranche.creditEnhancement,
      currency: tranche.currency,
      cusip: tranche.cusip,
      cusip_144a: tranche.cusip_144a,
      cusipRegs: tranche.cusipRegs,
      dateOffered: tranche.dateOffered,
      dbrsRating: tranche.dbrsRating,
      discountMargin: tranche.discountMargin,
      expectedMaturity: tranche.expectedMaturity,
      figi: tranche.figi,
      fitchRating: tranche.fitchRating,
      fpr: tranche.fpr,
      guarantor: tranche.guarantor,
      isin: tranche.isin,
      isin_144a: tranche.isin_144a,
      isinRegs: tranche.isinRegs,
      issuePrice: tranche.issuePrice,
      kroll: tranche.kroll,
      legalMaturity: tranche.legalMaturity,
      moodysRating: tranche.moodysRating,
      morningstar: tranche.morningstar,
      position: tranche.position,
      priceTalk: tranche.priceTalk,
      rank: tranche.rank,
      rating: tranche.rating,
      retained: tranche.retained,
      spRating: tranche.spRating,
      spread: tranche.spread,
      trancheComments: tranche.trancheComments,
      window: tranche.window,
      yield: tranche.yield,
    };

    const newTranche = this.store.createRecord('tranche', {
      position: position,
      deal: deal,
    });

    newTranche.setProperties({
      deal: cloneTranche.deal,
      amountOffered: cloneTranche.amountOffered,
      averageLife: cloneTranche.averageLife,
      benchmark: cloneTranche.benchmark,
      callComment: cloneTranche.callComment,
      callDate: cloneTranche.callDate,
      callOption: cloneTranche.callOption,
      callProtection: cloneTranche.callProtection,
      className: cloneTranche.className,
      coupon: cloneTranche.coupon,
      couponType: cloneTranche.couponType,
      createdAt: cloneTranche.createdAt,
      creditEnhancement: cloneTranche.creditEnhancement,
      currency: cloneTranche.currency,
      cusip: cloneTranche.cusip,
      cusip_144a: cloneTranche.cusip_144a,
      cusipRegs: cloneTranche.cusipRegs,
      dateOffered: cloneTranche.dateOffered,
      dbrsRating: cloneTranche.dbrsRating,
      discountMargin: cloneTranche.discountMargin,
      expectedMaturity: cloneTranche.expectedMaturity,
      figi: cloneTranche.figi,
      fitchRating: cloneTranche.fitchRating,
      fpr: cloneTranche.fpr,
      guarantor: cloneTranche.guarantor,
      isin: cloneTranche.isin,
      isin_144a: cloneTranche.isin_144a,
      isinRegs: cloneTranche.isinRegs,
      issuePrice: cloneTranche.issuePrice,
      kroll: cloneTranche.kroll,
      legalMaturity: cloneTranche.legalMaturity,
      moodysRating: cloneTranche.moodysRating,
      morningstar: cloneTranche.morningstar,
      position: cloneTranche.position,
      priceTalk: cloneTranche.priceTalk,
      rank: cloneTranche.rank,
      rating: cloneTranche.rating,
      retained: cloneTranche.retained,
      spRating: cloneTranche.spRating,
      spread: cloneTranche.spread,
      trancheComments: cloneTranche.trancheComments,
      window: cloneTranche.window,
      yield: cloneTranche.yield,
    });

    cloneTranche.destinations.then((destination) => {
      newTranche.destinations = destination;
    });

    cloneTranche.bookManagerBanks.then((bookManagerBank) => {
      newTranche.bookManagerBanks = bookManagerBank;
    });

    cloneTranche.otherManagerBanks.then((otherManagerBank) => {
      newTranche.otherManagerBanks = otherManagerBank;
    });
  }
}
