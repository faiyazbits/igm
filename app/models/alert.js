// app/models/alert.js

import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { filterBy } from '@ember/object/computed';

export default class AlertModel extends Model {
  @belongsTo('alertable', {
    async: true,
    polymorphic: true,
    inverse: null,
  })
  alertable;

  @belongsTo('user', {
    async: true,
    inverse: 'alerts',
  })
  user;

  @hasMany('alert-time-ranges', { async: true, inverse: 'alert' })
  alertTimeRanges;

  @filterBy('alertTimeRanges', 'enabled', true)
  enabledTimeRanges;

  @attr('string', { defaultValue: 'instant' })
  alertType;

  @attr('string', { defaultValue: 'feed' })
  alertableType;

  @attr('string')
  timeZone;

  @attr('string') // Add the ID attribute for dynamic segment
  id;
}
