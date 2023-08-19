import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ApplicationSerializer from '../application/serializer';

export default class DealSerializer extends ApplicationSerializer.extend(
  EmbeddedRecordsMixin
) {
  attrs = {
    bookManagerBanks: { serialize: 'ids' },
    bookManagerBanksList: { serialize: false },
    createdAt: { serialize: false },
    destinations: { serialize: 'ids' },
    otherManagerBanks: { serialize: 'ids' },
    relatedStories: { serialize: 'ids' },
    trancheBookManagers: { serialize: false },
    updatedAt: { serialize: false },
  };
}
