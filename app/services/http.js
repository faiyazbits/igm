import Service, { service } from '@ember/service';
import { computed, get } from '@ember/object';

export default class HttpService extends Service {
  @service session;

  @computed(
    'session.data.authenticated.{access_token,token}',
    'session.isAuthenticated'
  )
  get headers() {
    let headers = {};
    const authData = `token="${this.session.data.authenticated.access_token}"`;

    if (this.session.isAuthenticated) {
      headers = `Token ${authData}`;
    }

    return headers;
  }

  async fetchData(endpoint, method, data = null) {
    if (method == 'GET') {
      return await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.headers,
        },
        method: method,
      })
        .then((result) => {
          return result.json();
        })
        .then((response) => {
          return response;
        });
    } else {
      return await fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.headers,
        },
        method: method,
        body: JSON.stringify(data),
      })
        .then((result) => {
          return result.json();
        })
        .then((response) => {
          return response;
        });
    }
  }
}
