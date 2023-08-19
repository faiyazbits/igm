import Transform from '@ember-data/serializer/transform';
import { typeOf } from '@ember/utils';

const toArray = (value) => {
  switch (typeOf(value)) {
    case 'array':
      return value;
    case 'string':
      return value
        .split(',')
        .map(function (el) {
          return el.trim();
        })
        .filter(function (el) {
          return el.length > 0;
        });
    default:
      return [];
  }
};
export default class ArrayTransform extends Transform {
  serialize(value) {
    return toArray(value);
  }

  deserialize(value) {
    return toArray(value);
  }
}
