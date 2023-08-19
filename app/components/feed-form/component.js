import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action, get } from '@ember/object';
import { service } from '@ember/service';

export default class FeedFormComponent extends Component {

@service store;
@tracked feed;

@service('discover') discoverService;

@tracked
isShowingAndDestinations = false;
@tracked
isShowingOrDestinations = false;



@action
save(feed) {
  const contentType = get(this, 'contentTypes.firstObject.contentType');
  this.args.feed.contentType = contentType;
  this.discoverService.save(feed)

}


@action toggleAndDestinations() {
  this.isShowingAndDestinations = !this.isShowingAndDestinations;

}

@action
toggleOrDestinations() {
  this.isShowingOrDestinations = !this.isShowingOrDestinations;

}

@action
delete(feedId) {
  const store = get(this, 'store');
  store.queryRecord('dashboardItem', {
      dashboardable_id: feedId,
      dashboardable_type: 'Feed'
  }).then((dashboardItem) => {
    this.discoverService.delete(dashboardItem);
  });
}




}
