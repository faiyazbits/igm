import Controller from '@ember/controller';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LeagueTableSearchController extends Controller {
  @service dealOptions;

  @tracked
  dealIdentifier = 'corporate';
}
