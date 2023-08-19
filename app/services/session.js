import { computed, get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { isPresent } from '@ember/utils';
import SessionService from 'ember-simple-auth/services/session';

export default class IgmsessionService extends SessionService {
  @service store;

  @alias('data.authenticated.token_data.sub')
  currentUserId;

  @alias('data.authenticated.token_data.impersonated')
  isImpersonated;

  @computed('currentUserId')
  get currentUser() {
    const userId = this.currentUserId;

    if (isPresent(userId)) {
      return this.store.findRecord('user', userId);
    }
  }

  @computed('data.authenticated.token_data.impersonator_id')
  get impersonator() {
    const impersonatorId = get(
      this,
      'data.authenticated.token_data.impersonator_id'
    );

    if (isPresent(impersonatorId)) {
      return this.store.findRecord('user', impersonatorId);
    }
  }

  async impersonate(userId) {
    const authenticator = 'authenticator:application';
    const grantType = 'impersonation';
    const refreshToken = this.get('data.authenticated.refresh_token');

    const authParams = { grantType, refreshToken, userId };

    await this.session.authenticate(authenticator, authParams);

    await this.store.unloadAll();
  }
}
