import { get, set, setProperties, action } from '@ember/object';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AuthenticatedRoute from '../../authenticated/route';

export default class StoriesShowRoute extends AuthenticatedRoute {
  @service store;

  @service feedFactory;

  async model(params) {
    const story = await this.store.findRecord('story', params.story_id);
    const storyDestinations = await story.destinations;
    const alertFeed = await this.feedFactory.createFromDestinations(
      storyDestinations,
      {
        contentType: 'Story',
        onDashboard: false,
      }
    );

    const dashboardFeed = await this.feedFactory.createFromDestinations(
      storyDestinations,
      {
        contentType: 'Story',
        onDashboard: true,
      }
    );

    return { story, alertFeed, dashboardFeed };
  }

  async setupController(controller, model) {
    await super.setupController(controller, model);

    setProperties(controller, model);

    const story = model.story;

    story.relatedStories.then((stories) => {
      set(controller, 'relatedStories', stories);
    });
  }

  @action
  willTransition(transition) {
    const alertFeed = this.controller.alertFeed;
    const dashboardFeed = this.controller.dashboardFeed;

    if (alertFeed.isNew) {
      alertFeed.deleteRecord();
    }

    if (dashboardFeed.get('isNew')) {
      dashboardFeed.deleteRecord();
    }
  }
}
