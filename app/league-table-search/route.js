import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class LeagueTableSearchRoute extends Route {
  @service dealOptions;
  @service store;
}
