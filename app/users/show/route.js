import AuthenticatedRoute from '../../authenticated/route';
import { service } from '@ember/service';

export default class UsersShowRoute extends AuthenticatedRoute {
  @service store;

  queryParams = {
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  async model(params) {
    const [user, stories] = await Promise.all([
      this.store.findRecord('user', params.user_id),
      this.store.query('story', {
        author_id: params.user_id,
        per: params.per,
        page: params.page
      })
    ]);

    return { user, stories }
  }
}
