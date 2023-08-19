import Controller from '@ember/controller';
import { alias } from '@ember/object/computed';

export default class TechnicalCompositesController extends Controller {
  queryParams = ['destinations'];
  destinations = [];
  @alias('model')
  technicalComposites;

}
