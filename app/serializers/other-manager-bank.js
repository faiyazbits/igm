import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class OtherManagerBankSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  modelNameFromPayloadKey(key) {
    return 'other-manager-bank';
  }
}
