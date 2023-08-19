import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const investors = [
  'banks',
  'banksPrivateBanks',
  'bankTreasuries',
  'centralBanksOis',
  'corporates',
  'fundAssetManagers',
  'hedgeFunds',
  'insurance',
  'typeOther',
  'pensions',
  'pensionsInsurance',
  'privateBanks',
  'privateBanksRetail',
  'retail',
];

export default class InvestorTypeStatsPrinterComponent extends Component {
  @tracked hasInvestorTypeStats = false;

  didReceiveAttrs() {
    let investorSum = 0;
    let deal = this.deal;

    investors.forEach((investor) => {
      investorSum += get(deal, `distribution.${investor}`);
    });

    if (investorSum > 0) {
      set(this, 'hasInvestorTypeStats', true);
    }
  }
}
