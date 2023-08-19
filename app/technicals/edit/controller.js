import { action, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import Controller from '@ember/controller';
import { service } from '@ember/service';

export default class TechnicalsNewController extends Controller {
  @service router;
  @service store;
  
  page = 1;
  per = 20;

  @action
  async publish(technical) {
    if (this.newCommentaryBody) {
      var newCommentary = this.store.createRecord('commentary');
      newCommentary.set('body', this.newCommentaryBody);
      newCommentary.set('headline', this.newCommentaryHeadline);
      technical.get('commentaries').pushObject(newCommentary);
      
      await newCommentary.save();
      const tech = await technical.save();
      this.router.transitionTo('technicals.show', tech.id);

    } else {
      const tech = await technical.save();
      this.router.transitionTo('technicals.show', tech.id);
    }
  }
}
