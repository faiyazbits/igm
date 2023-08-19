import Route from '@ember/routing/route';
import { service } from '@ember/service';
import AuthenticatedRoute from '../../authenticated/route';

export default class StoriesVersionsRoute extends AuthenticatedRoute {
  @service store;
  @service http;

  model(params) {
    return new Promise((resolve) => {
      const response = this.http.fetchData(
        `/api/v1/versions.json?story_id=${params.story_id}`,
        'GET'
      );
      response.then((result) => {
        const data = result.versions.map((version) => {
          let newVersion = this.store.createRecord('story-version', version);
          return newVersion;
        });

        resolve(data);
      });
    });
  }
}
