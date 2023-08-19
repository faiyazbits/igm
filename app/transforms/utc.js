import Transform from '@ember-data/serializer/transform';
import moment from 'moment-timezone';

export default class UtcTransform extends Transform {
  serialize(value) {
    return value ? value.toJSON() : null;
  }

  deserialize(value) {
    return value ? moment.utc(value) : null;
  }
}
