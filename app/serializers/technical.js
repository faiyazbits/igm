import ApplicationSerializer from '../application/serializer';
import { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default class TechnicalSerializer extends ApplicationSerializer.extend(EmbeddedRecordsMixin) {
    
    attrs = {
        assetType: { serialize: false },
        destinations: { serialize: 'ids' },
        currency: { serialize: false }
    }
}