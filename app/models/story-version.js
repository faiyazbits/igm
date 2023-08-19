import Model from '@ember-data/model';
import { set, get } from '@ember/object';
import { camelize, capitalize } from '@ember/string';
import moment from 'moment-timezone';

export default class StoryVersionModel extends Model {
  get updatedAtFormatted() {
    return moment(get(this, 'changeset.updated_at')[1]).format(
      'MMMM Do YYYY, h:mm:ss a'
    );
  }

  get changes() {
    return [
      this.formatChange('headline'),
      this.formatChange('body'),
      this.formatChange('tag_list'),
    ];
  }

  formatChange(changeName) {
    var change = get(this, `changeset.${changeName}`);
    if (change) {
      return {
        attribute: capitalize(camelize(changeName)),
        old: change[0],
        new: change[1],
      };
    }
    return null;
  }
}
