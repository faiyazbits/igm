import Component from '@glimmer/component';
import { action, get } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class TechnicalCommentaryComponent extends Component {
  @service() notify;
  @tracked isEditing = false;

  @action
  edit() {
    this.isEditing = true;
  }

  @action
  cancelEdit() {
    this.args.commentary.rollbackAttributes();
    this.isEditing = false;
  }

  @action
  async save() {
    await this.args.commentary.save();
    this.isEditing = false;
  }

  @action
  async delete() {
    try{
      await this.args.commentary.destroyRecord();
      this.notify.success('Commentary deleted successfully!');
    }
    catch(e){
      this.notify.alert('Commentary could not be deleted!');
    }
  }

  @action
  updateBody(body) {
    this.args.commentary.body = body;
  }
  
}
