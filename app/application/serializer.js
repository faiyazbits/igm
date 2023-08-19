import { ActiveModelSerializer } from 'active-model-adapter';

export default class ApplicationSerializer extends ActiveModelSerializer.extend(
  { isNewSerializerAPI: true }
) {
  modelNameFromPayloadKey(key) {
    if (key === 'and_destinations') {
      return 'destination';
    }
    if (key === 'or_destinations') {
      return 'destination';
    }
    if (key === 'related_stories') {
      return 'story';
    }
    return super.modelNameFromPayloadKey(key);
  }
}
