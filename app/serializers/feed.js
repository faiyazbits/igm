import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class FeedSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    andDestinations: { serialize: 'ids' },
    orDestinations: { serialize: 'ids' },
    searchResults: { deserialize: 'records' },
  };
}
