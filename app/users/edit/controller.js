import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class UsersEditController extends Controller {
    @service notify;
    @service router;

    @action
    async save(models) {

        try{
            const model = await models.save();

            this.notify.success('Profile saved successfully!');
            this.router.transitionTo('users.show', model.id);
        }
        catch(e){
            this.notify.alert("Profile could not be saved. Please try again.");
        }        
    }
}
