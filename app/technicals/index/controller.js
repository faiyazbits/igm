import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class TechnicalsIndexController extends Controller {
  queryParams = ['destinations'];
  destinations = [];
  @alias('model') technicals;
  @alias('model.meta.total_pages') totalPages;
  page = 1;
  per = 20;
}
