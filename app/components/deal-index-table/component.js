import Component from '@glimmer/component';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { dasherize } from '@ember/string';

export default class DealIndexTableComponent extends Component {
  @tracked indexPageView = false;
  @tracked landingPageView = this.args.landingPageView || false;
  @tracked feedPageView = this.args.feedPageView || false;
  @tracked feed = Promise.resolve(this.store.createRecord('feed'));
  hasExported = false;

  @tracked downloadEnabled = false;

  @service feedFactory;
  @service notify;
  @service store;
  @service session;
  @service features;

  get hasExported() {
    return false;
  }

  @action
  async dealIndexInserted() {
    const destinations = this.destinations;
    await destinations
      .then((d) => {
        return this.feedFactory.createFromDestinationNames(d, {
          contentType: 'Deal',
        });
      })
      .then((feed) => {
        this.feed = Promise.resolve(feed);
        return this.feed;
      });

    let canDownload = await this.canDownloadEnabled();
    console.log(canDownload);
    this.downloadEnabled = canDownload;
  }

  get titleLink() {
    const dataType = this.feed.then((f) => {
      const cont = f.contentType;
      return dasherize(cont) || '';
    });
    return dataType;
  }

  get destinations() {
    return this.args.destinations || [];
  }

  async canDownloadEnabled() {
    const destinations = await this.destinations;
    const hasCredit = await this.session.currentUser.then((u) => u.hasCredit);
    const hasCreditDatabases = await this.session.currentUser.then(
      (u) => u.hasCreditDatabases
    );
    const containsPipelineOrPricedDestTag =
      destinations.includes('priced') || destinations.includes('pipeline');

    if (
      containsPipelineOrPricedDestTag &&
      (!hasCreditDatabases || !hasCredit)
    ) {
      return false;
    }

    return true;
  }

  get headers() {
    const fieldsToDisplay = this.fieldsToDisplay;

    return fieldsToDisplay.then((d) => {
      return d.map((field) => field.header);
    });
  }

  fieldsToDisplayMap = {
    priced: {
      em: [
        { header: 'Date', property: 'displayDateOffered' },
        { header: 'Issuer', property: 'issuer.displayName' },
        { header: 'Currency', property: 'currency' },
        { header: 'Amount', property: 'displayAmount' },
        { header: 'Coupon', property: 'coupon' },
        { header: 'Issue Price', property: 'issuePrice' },
        { header: 'Maturity', property: 'displayMaturity' },
        { header: 'Term', property: 'term' },
        { header: 'Benchmark', property: 'benchmark' },
        { header: 'Spread', property: 'spread' },
        { header: "Moody's", property: 'moodysRating' },
        { header: 'S&P', property: 'spRating' },
        { header: 'Fitch', property: 'fitchRating' },
        { header: 'Bookrunners', property: 'bookManagerBanks' },
        { header: 'Book Size', property: 'bookSize' },
      ],

      hy: [
        { header: 'Date', property: 'displayDateOffered' },
        { header: 'Issuer', property: 'issuer.displayName' },
        { header: 'Currency', property: 'currency' },
        { header: 'Amount', property: 'displayAmount' },
        { header: 'Term', property: 'term' },
        { header: 'Call', property: 'callProtection' },
        { header: "Moody's", property: 'moodysRating' },
        { header: 'S&P', property: 'spRating' },
        { header: 'Issue Price', property: 'issuePrice' },
        { header: 'Coupon', property: 'coupon' },
        { header: 'Yield', property: 'yield' },
        { header: 'Benchmark', property: 'benchmark' },
        { header: 'Spread', property: 'spread' },
        { header: 'Bookrunners', property: 'bookManagerBanks' },
      ],

      ig: [
        { header: 'Date', property: 'displayDateOffered' },
        { header: 'Issuer', property: 'issuer.displayName' },
        { header: 'Currency', property: 'currency' },
        { header: 'Amount', property: 'displayAmount' },
        { header: 'Coupon', property: 'coupon' },
        { header: 'Issue Price', property: 'issuePrice' },
        { header: 'Maturity', property: 'displayMaturity' },
        { header: 'Term', property: 'term' },
        { header: 'Benchmark', property: 'benchmark' },
        { header: 'Spread', property: 'spread' },
        { header: "Moody's", property: 'moodysRating' },
        { header: 'S&P', property: 'spRating' },
        { header: 'Fitch', property: 'fitchRating' },
        { header: 'Bookrunners', property: 'bookManagerBanks' },
        { header: 'Book Size', property: 'bookSize' },
      ],

      sf: [
        { header: 'Date ', property: 'displayDateOffered' }, // Do not remove space on 'Date ' because it is used to differentiate CSS classes
        { header: 'Deal Name', property: 'issuer.displayName' },
        { header: 'Size', property: 'displayTotalDealSize' },
        { header: 'Asset Class', property: 'assetClass' },
        { header: 'Bookrunners', property: 'trancheBookManagers' },
      ],

      sfAbs: [
        { header: 'Date ', property: 'displayDateOffered' }, // Do not remove space on 'Date ' because it is used to differentiate CSS classes
        { header: 'Deal Name', property: 'issuer.displayName' },
        { header: 'Size', property: 'displayTotalDealSize' },
        { header: 'ABS Asset Class', property: 'absAssetClass' },
        { header: 'Bookrunners', property: 'trancheBookManagers' },
      ],
    },
    pipeline: {
      em: [
        { header: 'Date', property: 'displayDateOffered' },
        { header: 'Issuer', property: 'issuer.displayName' },
        { header: 'Currency', property: 'currency' },
        { header: 'Amount', property: 'displayAmount' },
        { header: 'Term', property: 'term' },
        { header: "Mdy's/S&P", property: 'moodysAndSpRating' },
        { header: 'Notes', property: 'comments' },
        { header: 'Px Talk', property: 'priceTalk' },
        { header: 'Bookrunners', property: 'bookManagerBanks' },
      ],

      hy: [
        { header: 'Date', property: 'displayDateOffered' },
        { header: 'Issuer', property: 'issuer.displayName' },
        { header: 'Currency', property: 'currency' },
        { header: 'Amount', property: 'displayAmount' },
        { header: 'Term', property: 'term' },
        { header: 'Call', property: 'callProtection' },
        { header: "Mdy's/S&P", property: 'moodysAndSpRating' },
        { header: 'Notes', property: 'comments' },
        { header: 'Px Talk', property: 'priceTalk' },
        { header: 'Bookrunners', property: 'bookManagerBanks' },
      ],

      ig: [
        { header: 'Date', property: 'displayDateOffered' },
        { header: 'Issuer', property: 'issuer.displayName' },
        { header: 'Currency', property: 'currency' },
        { header: 'Amount', property: 'displayAmount' },
        { header: 'Term', property: 'term' },
        { header: "Mdy's/S&P", property: 'moodysAndSpRating' },
        { header: 'Notes', property: 'comments' },
        { header: 'Px Talk', property: 'priceTalk' },
        { header: 'Bookrunners', property: 'bookManagerBanks' },
      ],

      sf: [
        { header: 'Deal Name', property: 'issuer.displayName' },
        { header: 'Size', property: 'displayTotalDealSize' },
        { header: 'Asset Class', property: 'assetClass' },
        { header: 'Bookrunners', property: 'trancheBookManagers' },
      ],

      sfAbs: [
        { header: 'Deal Name', property: 'issuer.displayName' },
        { header: 'Size', property: 'displayTotalDealSize' },
        { header: 'ABS Asset Class', property: 'absAssetClass' },
        { header: 'Bookrunners', property: 'trancheBookManagers' },
      ],
    },
  };

  get fieldsToDisplay() {
    const destinations = this.destinations;
    let dealTypeP = destinations.then((d) => {
      if (d.includes('abs')) {
        return 'sfAbs';
      } else {
        return this.args.dealType;
      }
    });

    const fieldsToDisplayMap = this.fieldsToDisplayMap;
    const status = this.args.status;
    return dealTypeP.then((dType) => {
      if (status) {
        return fieldsToDisplayMap[status][dType] || [];
      }
      return [];
    });
  }

  get propertiesToDisplay() {
    const fieldsToDisplay = this.fieldsToDisplay;
    return fieldsToDisplay.then((field) => {
      return field.map((f) => f.property);
    });
  }

  get rows() {
    const deals = this.args.deals;

    const rows = deals.map((deal) => {
      return this._buildRow(deal);
    });
    return Promise.all(rows);
  }

  async _buildRow(deal) {
    const propertiesToDisplay = await this.propertiesToDisplay;

    const columns = propertiesToDisplay.map((property) => {
      const isBookManager = property === 'bookManagerBanks';
      const isIssuer = property === 'issuer.displayName';
      let value = deal.get(property);

      value = this._removeNullStrings(value, property);

      return {
        deal: deal,
        isBookManager: isBookManager,
        isIssuer: isIssuer,
        value: value,
      };
    });

    return { columns: columns };
  }

  _removeNullStrings(value, property) {
    if (
      (typeof value === 'string' && value.indexOf('null') !== -1) ||
      (typeof value === 'string' && value.indexOf('Null') !== -1) ||
      (typeof value === 'string' && value.indexOf('NULL') !== -1)
    ) {
      if (property === 'moodysAndSpRating') {
        if (value === 'null / null') {
          return '';
        } else if (value.indexOf('null') === 0) {
          return value.replace('null /', '');
        } else {
          return value.replace('/ null', '');
        }
      } else {
        return '';
      }
    } else {
      return value;
    }
  }

  @action
  async saveFeed() {
    try {
      const feed = await this.feed;
      feed.save();
      
      this.notify.success('Feed saved successfully!');
    } catch (errors) {
      this.notify.alert("Feed couldn't be saved. Please try again.");
    }
  }

  @action
  async exportData(sendInCSV, sendInExcel, sendInXLSX) {
    const hasExported = this.hasExported;

    if (sendInCSV || sendInExcel || sendInXLSX) {
      if (hasExported) {
        this.notify.alert('You have already exported these deals.');
      } else {
        this.hasExported = true;

        const destinations = await this.args.destinations;
        const store = this.store;
        const params = {
          exportName: 'Deal',
          params: {
            destinations: destinations,
            sendInCSV: sendInCSV,
            sendInExcel: sendInExcel,
            sendInXLSX: sendInXLSX,
          },
        };
        this.notify.success("Beginning export. You'll receive an email soon.");

        const exporting = store.createRecord('export', params);
        await exporting.save();
      }
    } else {
      this.notify.info(
        'Please select one or any formats in which to export the results.'
      );
    }
  }
}
