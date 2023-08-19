import ActiveModelAdapter from 'active-model-adapter';
import { computed } from '@ember/object';
import { service } from '@ember/service';
import ApplicationSerializer from './serializer';

export default class ApplicationAdapter extends ActiveModelAdapter {
  namespace = 'api/v1';
  defaultSerializer = ApplicationSerializer;

  @service session;

  @computed(
    'session.data.authenticated.{access_token,token}',
    'session.isAuthenticated'
  )
  get headers() {
    let headers = {};
    const authData = `token="${this.session.data.authenticated.access_token}"`;

    if (this.session.isAuthenticated) {
      headers['Authorization'] = `Token ${authData}`;
    }

    return headers;
  }
}
