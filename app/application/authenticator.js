import OAuth2PasswordGrant from 'ember-simple-auth/authenticators/oauth2-password-grant';
import { run } from '@ember/runloop';

export default class ApplicationAuthenticator extends OAuth2PasswordGrant {
  serverTokenEndpoint = '/api/v1/session';
  serverImpersonationTokenEndpoint = '/api/v1/impersonation_token';

  authenticate(email, password) {
    let credentials = {
      email,
      password,
      grant_type: 'password',
    };
    return this._authenticate(this.serverTokenEndpoint, credentials);
  }

  _authenticate(endpoint, credentials) {
    return new Promise((resolve, reject) => {
      fetch(endpoint, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(credentials),
      })
        .then((res) => {
          return res.json();
        })
        .then((response) => {
          run(() => {
            if (response.errors) {
              reject(response.errors);
            }
            const tokenData = this._decodeTokenData(response.access_token);
            const expiresIn = response['expires_in'];
            const expiresAt = this._absolutizeExpirationTime(expiresIn);
            const refreshToken = response['refresh_token'];

            const data = {
              ...response,
              expires_in: expiresIn,
              expires_at: expiresAt,
              token_data: tokenData,
            };

            resolve(data);
          });
        })
        .catch((e) => {
          reject(e);
        });
    });
  }

  _decodeTokenData(token) {
    const claims = token.split('.')[1];
    const decodedClaims = atob(claims);

    return JSON.parse(decodedClaims);
  }
}
