import Controller from '@ember/controller';
import { service } from '@ember/service';
import { action } from '@ember/object';
import { A } from '@ember/array';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;
  @service router;
  errors = A([]);
  @tracked
  email = '';

  @tracked
  password = '';

  @action
  async authenticate(event) {
    event.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:application',
        this.email,
        this.password
      );
    } catch (e) {
      this.errors.pushObjects(e);
    }
  }
}
