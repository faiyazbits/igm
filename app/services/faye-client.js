import Service, { service } from '@ember/service';
import ENV from 'igm-upgrade/config/environment';

export default class FayeClientService extends Service {
  token = null;
  faye = null;
  faye_address = ENV.faye_address;
  @service session;
  @service store;
  init() {
    super.init(...arguments);
    this.faye = new Faye.Client(this.faye_address);
    this._setupSubscribeAuthentication();
  }

  setupAuthentication(token) {
    this.token = token;
  }

  subscribeToSearchQuery(searchQueryId, callback) {
    return this.faye.subscribe('/search_query/' + searchQueryId, (data) => {
      const store = this.store;
      const content = JSON.parse(data.content);
      if (data.action === 'create') {
        store.pushPayload(data.type, content);
        const model = store.peekRecord(data.type, data.id);
        callback(model);
      } else if (data.action === 'update') {
        store.pushPayload(data.type, content);
      } else if (data.action === 'delete') {
        const model = store.peekRecord(data.type, data.id);
        if (model) {
          store.deleteRecord(model);
        }
      }
    });
  }

  _setupSubscribeAuthentication() {
    this.faye.addExtension({
      outgoing: (message, callback) => {
        if (message.channel === '/meta/subscribe') {
          // add authentication to successfully subscribe
          message.ext = message.ext || {};
          const token = this.token;
          message.ext.token = token;
          return callback(message);
        } else {
          return callback(message);
        }
      },
    });
  }
}
