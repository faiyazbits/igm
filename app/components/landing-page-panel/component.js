import Component from '@glimmer/component';
// import ComponentPagination from '../mixins/component-pagination';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';



export default class LandingPagePanelComponent extends Component {

  feed = null;
  dataLoaded =  false;
  @tracked items = null;
  @tracked page = 1;
  @tracked per = 10;
  @tracked totalPages;

  @service notify;
  @service store;
  @service feedFactory;

  @computed('args.dataType')
  get landingComponent() {
    return `${this.args.dataType}-landing`;
  }

  get isValidComponent(){
    return this.args.dataType;
  }


  get isValidType() {
    const validTypes = ['story', 'deal', 'technical', 'technical-composite', 'mtn'];
    const dataType = this.args.dataType;
    return validTypes.includes(dataType);
  }



  get isLinkable() {
    const dataType = this.args.dataType;
    return ['story', 'deal', 'technical', 'technical-composite', 'mtn'].includes(dataType);
  }


  get isMtn() {
    return this.args.dataType === 'mtn';
  }

  get isDeal() {
    return this.args.dataType === 'deal';
  }


  get isLeagueTable() {
    return this.args.dataType === 'league-table';
  }

  get isNotAlertable() {
    return this.isTechComposite || this.isWeeklyOrMonthlyMtn;
  }

  isShowingStoryBody = false;

  get isStory() {
    return this.args.dataType === 'story';
  }

  get isTechComposite() {
    return this.args.dataType === 'technical-composite';
  }

  get isWeeklyOrMonthlyMtn() {
    const isWeekly = this.args.period === 'weekly';
    const isMonthly = this.args.period === 'monthly';
    return isWeekly || isMonthly;
  }

  get titleLink() {
    const dataType = this.args.dataType;
    if(dataType == 'mtn'){
      return 'landing-page';
    }else{
      return dataType;
    }
   // return dataType.pluralize();
  }

  @computed('destinations')
  get status() {
    const destinations = this.destinations;
    if (destinations.includes('priced')) {
      return 'priced';
    } else if (destinations.includes('pipeline')) {
      return 'pipeline';
    }
  }

  get dealType() {
    const destinations = this.destinations;
    if (destinations.includes('em')) {
      return 'em';
    } else if (destinations.includes('hy')) {
      return 'hy';
    } else if (destinations.includes('ig')) {
      return 'ig';
    } else if (destinations.includes('sf')) {
      return 'sf';
    }
  }

  dataLoaded = false;

  constructor(owner, args) {
   super(owner, args);
    this._refreshModel();
  }

 async _refreshModel() {
    if (this.isValidType) {
      const store = this.store;
      const destinations = this.args.destinations;
      const dataType = this.args.dataType;
      const params = {
        destinations: destinations,
        title: this.args.title,
        period: this.args.period,
        page: this.page,
        per: this.per
      };

      if (dataType === 'deal') {
       this.feed =  this.feedFactory.createFromDestinationNames(destinations, {contentType: 'Deal'});
      } else if (dataType === 'technical') {
       this.feed = this.feedFactory
          .createFromDestinationNames(destinations, {
            contentType: 'Technical'
          });

      } else if (dataType === 'technical-composite') {
      this.feed =  this.feedFactory
          .createFromDestinationNames(destinations, {
            contentType: 'TechnicalComposite',
            onDashboard: true
          });
      } else {
      this.feed = await this.feedFactory.createFromDestinationNames(destinations);
      }

     const models = await store.query(dataType, params);
        this.items = models;
        this.totalPages = models.meta.total_pages;
        this.dataLoaded = true;

    }
  }

  @action
  async next() {
    const nextPage = this.page + 1;
    this.page = nextPage;
    const paginatedFeed = await this._refreshModel();
    this.feed = paginatedFeed;

  }

  @action
  async previous() {
    const previousPage = this.page - 1;
    this.page = previousPage;
    const paginatedFeed = await this._refreshModel();
    this.feed = paginatedFeed;
  }


  get hasNextPage() {
    return this.page < this.totalPages;
  }

  get hasPreviousPage() {
    return this.page >= 2;
  }

  @action
  saveFeed(feed) {
    return feed
      .save()
      .then(() => {
        this.notify.success('Feed saved successfully!');
      })
      .catch(() => {
        this.notify.alert("Feed couldn't be saved. Please try again.");
      });
  }

  @action
  toggleIsShowingStoryBody() {
    this.isShowingStoryBody = !this.isShowingStoryBody;
  }

  @action
 async exportData(sendInCSV, sendInExcel, sendInXLSX) {
    const hasExported = this.hasExported;

    if (sendInCSV || sendInExcel || sendInXLSX) {
      if (hasExported) {
        this.notify.alert('You have already exported these deals.');
      } else {
        this.hasExported = true;
        const destinations = this.destinations;
        const store = this.store;
        const params = {
          exportName: 'Mtn',
          params: {
            destinations: destinations,
            sendInCSV: sendInCSV,
            sendInExcel: sendInExcel,
            sendInXLSX: sendInXLSX,
            title: this.args.title,
            period: this.args.period
          }
        };
        this.notify.success("Beginning export. You'll receive an email soon.");


        const exporting = store.createRecord('export', params);
        await exporting.save();
      }
    } else {
      this.notify.info('Please select one or any formats in which to export the results.');
    }
  }
}



