import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class DashboardSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  normalizeQueryRecordResponse(
    store,
    primaryModelClass,
    payload,
    id,
    requestType
  ) {
    let dashboards = payload.dashboards;
    delete payload.dashboards;
    let formattedPayload = {
      ...payload,
      dashboard: dashboards[0],
    };
    return super.normalizeQueryRecordResponse(
      store,
      primaryModelClass,
      formattedPayload,
      id,
      requestType
    );
  }
}
