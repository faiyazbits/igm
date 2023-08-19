import { service } from '@ember/service';
import AuthenticatedRoute from '../authenticated/route';

export default class TechnicalCompositeRoute extends AuthenticatedRoute {
  @service store;

  model(params) {
    return this.store.findRecord(
      'technical-composite',
      params.technical_composite_id
    );
  }
}
