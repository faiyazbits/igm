import Inflector from 'ember-inflector';
export function initialize(/* application */) {
  Inflector.inflector.irregular('tranche', 'tranches');
}

export default {
  initialize,
};
