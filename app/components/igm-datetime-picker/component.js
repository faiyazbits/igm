import { computed, get } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class IgmDatetimePickerComponent extends Component {
  errors = [];
  @tracked pickTime = false;
  // timeZone = this.args.timeZone;

  uid = Math.random() * 100 + 1;

  @tracked label = null;
  @tracked labelTranslation = this.args.labelTranslation;



  get labelDisplayName() {
    const labelTranslation = this.labelTranslation || null;
    const label = this.args.label;

    if (labelTranslation) {
      // return this.i18n.t("displayName." + labelTranslation, {});
      return labelTranslation;
    } else {
      return label;
    }
  }
}
