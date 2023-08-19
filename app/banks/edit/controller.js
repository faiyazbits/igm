import Controller from '@ember/controller';
import { action, get, set } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';

export default class BanksEditController extends Controller {
    @service('banks') banksService;

    @alias('model.bank') bank;
    @alias('model.banks') banks;

    @action
    delete(bank){
        this.banksService.delete(bank);
    }
}
