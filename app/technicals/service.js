import { action, set } from '@ember/object';
import Service, { service } from '@ember/service';

export default class TechnicalsService extends Service {
    @service store;
    @service notify;
    @service router;

    @action
    async save(technical) {
        try{
            await technical.save();
            this.router.transitionTo('technicals.index');
        }
        catch(e){
            this.notify.alert('Unable to save technical');
        }
    }
}