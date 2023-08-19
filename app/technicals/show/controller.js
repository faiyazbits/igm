import { action, get, set } from '@ember/object';
import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class TechnicalsShowController extends Controller {
  @service router;
  @service store;
  @service notify;
  
  page = 1;
  per = 20;

  @action
  async saveFeed() {
    try{
      await this.feed.save();
      this.notify.success('Feed saved successfully!');
    }
    catch(e){
      this.notify.alert("Feed couldn't be saved. Please try again.");
    }
  }
  
  @action
  back(){
    history.back();
  }
}
