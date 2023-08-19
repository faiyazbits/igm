import ApplicationAdapter from '../application/adapter';

export default class SearchAdapter extends ApplicationAdapter {
  pathForType(type) {
    return 'search';
  }
}
