import Controller from '@ember/controller';
import { alias, equal, or } from '@ember/object/computed';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class UsersShowController extends Controller {
  @service() session;
  @or("isAdmin", "isOwnProfile") canEditProfile;
  @alias("session.currentUser") currentUser;
  @equal("currentUser.role", "admin") isAdmin;
  @equal("user", "currentUser") isOwnProfile;
  per = 10;
  page = 1;
  @tracked totalPages = null;
  @alias("model.stories") stories;
  title = 'Headlines';
  @alias("model.stories.meta.total_pages") totalPages;
  @alias("model.user") user;
}
