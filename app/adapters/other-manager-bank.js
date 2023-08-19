import ApplicationAdapter from '../application/adapter';

export default class OtherManagerBankAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'banks';
  }
}
