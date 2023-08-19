import Component from '@glimmer/component';
import { get, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

const geos = [
  'americas',
  'asia',
  'austria',
  'belgium',
  'benelux',
  'canada',
  'centralAndEasternEurope',
  'china',
  'denmark',
  'emea',
  'europe',
  'finland',
  'france',
  'germany',
  'germanyAustria',
  'germanyAustriaSwitzerland',
  'greece',
  'hongKong',
  'iberia',
  'ireland',
  'italy',
  'japan',
  'korea',
  'latam',
  'luxembourg',
  'middleEast',
  'middleEastAfrica',
  'netherlands',
  'nonJapanAsia',
  'nordics',
  'northAmerica',
  'norway',
  'offshoreUs',
  'geoOther',
  'otherEurope',
  'portugal',
  'scandinavia',
  'singapore',
  'southernEurope',
  'spain',
  'sweden',
  'switzerland',
  'uk',
  'ukIreland',
  'us',
];

export default class GeographyStatsPrinterComponent extends Component {
  @tracked hasGeoStats = false;

  didReceiveAttrs() {
    let geoSum = 0;
    let deal = this.deal;

    geos.forEach((geo) => {
      geoSum += get(deal, `distribution.${geo}`);
    });

    if (geoSum > 0) {
      set(this, 'hasGeoStats', true);
    }
  }
}
