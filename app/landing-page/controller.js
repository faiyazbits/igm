import Controller from '@ember/controller';

export default class LandingPageController extends Controller {

  queryParams = ['category', 'name'];
  category = null;
  name = null;

}
