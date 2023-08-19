import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class SavedSearchSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    destinations: { serialize: 'ids', deserialize: 'records' },
    searchResults: { deserialize: 'records' },
  };
}
