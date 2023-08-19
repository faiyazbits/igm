import ApplicationAdapter from '../application/adapter';

export default class BookManagerBankAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'banks';
  }
}
