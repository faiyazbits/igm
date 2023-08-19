import AuthenticatedRoute from '../authenticated/route';
import { service } from '@ember/service';

export default class AuthorRoute extends AuthenticatedRoute {
  @service store;
  queryParams = {
    authorId: { refreshModel: true },
    name: { refreshModel: false },
    page: { refreshModel: true },
    per: { refreshModel: true },
  };

  model(params) {
    return this.store.query('story', {
      show_embargoed: true,
      page: params.page,
      per: params.per,
      author_id: params.authorId,
      name: params.name,
      author_page: true,
    });
  }
}
