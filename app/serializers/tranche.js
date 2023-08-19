import ApplicationSerializer from '../application/serializer';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class TrancheSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
    
    attrs = {
        bookManagerBanks: { serialize: 'ids' },
        destinations: { serialize: 'ids' },
        otherManagerBanks: { serialize: 'ids' }
    }
}