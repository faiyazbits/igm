import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class BookManagerBankSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  modelNameFromPayloadKey(key) {
    return 'book-manager-bank';
  }
}
