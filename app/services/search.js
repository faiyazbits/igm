import Service, { service } from '@ember/service';
import { underscore } from '@ember/string';
import PromiseProxyMixin from '@ember/object/promise-proxy-mixin';

import ObjectProxy from '@ember/object/proxy';

export default class SearchService extends Service {
  @service store;

  create(params) {
    const store = this.store;
    let newParams;

    if (params.changePeriod) {
      newParams = params;
    } else {
      newParams = this._underscoreParams(params);
    }
    const search = store.createRecord('search', { query: newParams });

    const searchPromise = new Promise((resolve, reject) => {
      search.save().then((search) => {
        resolve(search);
      });
    });

    return searchPromise;
  }

  _underscoreParams(params) {
    const underscoredParams = {};

    for (let prop in params) {
      const underscoredProp = underscore(prop);
      const value = params[prop];

      underscoredParams[underscoredProp] = value;
    }

    return underscoredParams;
  }
}
