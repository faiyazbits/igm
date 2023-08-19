import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class StorySerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    destinations: { serialize: 'ids' },
    tags: { serialize: 'ids' },
  };
}
