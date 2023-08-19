import Component from '@glimmer/component';
import { scheduleOnce } from '@ember/runloop';
import { action, get, set } from '@ember/object';
import { service } from '@ember/service';
import { A } from '@ember/array';
import { isPresent, isBlank } from '@ember/utils';
import UiPopoverComponent from '../ui-popover/component';
import { tracked } from '@glimmer/tracking';
import moment from 'moment-timezone';
import Sifter from 'sifter';

export default class AlertPopoverComponent extends UiPopoverComponent {
  @service notify;
  @service store;
  @service session;

  @tracked
  alert;

  @tracked
  isMtn = false;

  @tracked
  timezone = null;

  @tracked
  digestTimeRanges = A();

  @tracked
  instantTimeRange = null;

  get title() {
    const isNew = this.alert && this.alert.isNew;

    return isNew ? 'Add Alert' : 'Edit Alert';
  }

  get alertable() {
    return this.args.alertable || null;
  }

  get isInstant() {
    return this.alert && this.alert.alertType === 'instant';
  }

  @action
  async initAlertPopover() {
    const alertable = await this.alertable;
    if (isPresent(alertable)) {
      alertable.alert.then((alert) => {
        if (isBlank(alert)) {
          this._createAlert(alertable).then((alert) => {
            set(this, 'alert', alert);
            this._setupAlertTimeRanges(alert);
          });
        } else {
          set(this, 'alert', alert);
          this._setupAlertTimeRanges(alert);
        }
      });
    }
  }

  _createAlert(alertable) {
    if (this.isMtn) {
      return this.session.currentUser.then((user) => {
        const timeZone = user.timeZone;

        return this.store.createRecord('alert', {
          timeZone: timeZone,
          alertable: alertable,
          alertType: 'digest',
        });
      });
    } else {
      return this.session.currentUser.then((user) => {
        const timeZone = user.timeZone;

        return this.store.createRecord('alert', {
          timeZone: timeZone,
          alertable: alertable,
        });
      });
    }
  }

  _setupAlertTimeRanges(alert) {
    const timeZone = alert.timeZone;

    moment.tz.setDefault(timeZone);
    const midnight = moment({ hour: 0 }).utc().hour() * 60 * 60;
    const fiveAm = moment({ hour: 5 }).utc().hour() * 60 * 60;
    const noon = moment({ hour: 12 }).utc().hour() * 60 * 60;
    const fivePm = moment({ hour: 17 }).utc().hour() * 60 * 60;
    const tenPm = moment({ hour: 22 }).utc().hour() * 60 * 60;
    moment.tz.setDefault();

    if (this.isMtn) {
      get(alert, 'alertTimeRanges').then((alertTimeRanges) => {
        const digestTimeRanges = A();
        let startAt;
        let endAt;

        if (noon === 79200) {
          startAt = fiveAm + 1;
          endAt = noon;
        } else if (fivePm === 79200) {
          startAt = noon + 1;
          endAt = fivePm;
        } else if (tenPm === 79200) {
          startAt = fivePm + 1;
          endAt = tenPm;
        } else if (fiveAm === 79200) {
          startAt = tenPm + 1;
          endAt = fiveAm;
        }

        digestTimeRanges.push(
          this.store.createRecord('alert-time-range', {
            startAt: startAt,
            endAt: endAt,
            enabled: true,
            timeZone: timeZone,
          })
        );

        digestTimeRanges.forEach((dTime) => {
          alertTimeRanges.push(dTime);
        });
        this.digestTimeRanges = digestTimeRanges;
      });
    } else {
      get(alert, 'alertTimeRanges').then((alertTimeRanges) => {
        if (alertTimeRanges.length === 0) {
          // add instant range
          const instantTimeRange = this.store.createRecord('alert-time-range', {
            startAt: midnight,
            endAt: midnight,
            enabled: true,
            timeZone: timeZone,
          });
          alertTimeRanges.push(instantTimeRange);
          this.instantTimeRange = instantTimeRange;

          // add four digest ranges
          const digestTimeRanges = A();
          digestTimeRanges.push(
            this.store.createRecord('alert-time-range', {
              startAt: fiveAm + 1,
              endAt: noon,
              timeZone: timeZone,
            })
          );

          digestTimeRanges.push(
            this.store.createRecord('alert-time-range', {
              startAt: noon + 1,
              endAt: fivePm,
              timeZone: timeZone,
            })
          );

          digestTimeRanges.push(
            this.store.createRecord('alert-time-range', {
              startAt: fivePm + 1,
              endAt: tenPm,
              timeZone: timeZone,
            })
          );

          digestTimeRanges.push(
            this.store.createRecord('alert-time-range', {
              startAt: tenPm + 1,
              endAt: fiveAm,
              timeZone: timeZone,
            })
          );

          digestTimeRanges.forEach((dTime) => {
            alertTimeRanges.push(dTime);
          });
          this.digestTimeRanges = digestTimeRanges;
        } else {
          this.instantTimeRange = alertTimeRanges[0];
          this.digestTimeRanges = [1, 2, 3, 4].map((n) => alertTimeRanges[n]);
        }
      });
    }
  }

  _toggleInstantTimeRange(enabled) {
    this.instantTimeRange.enabled = enabled;
  }

  _toggleDigestTimeRanges(enabled) {
    this.digestTimeRanges.forEach((timeRange) => {
      timeRange.enabled = enabled;
    });
  }

  willDestroy() {
    const alert = this.alert;
    if (alert && alert.isNew) {
      alert.deleteRecord();
    }
  }

  @action
  async save() {
    const alert = this.alert;
    const alertableObject = this.alertable;
    let alertablePromise = await alertableObject;

    if (isBlank(alertablePromise.title)) {
      const andDestinations =
        alertablePromise.andDestinations.mapBy('displayName');
      const orDestinations =
        alertablePromise.orDestinations.mapBy('displayName');
      const destinationNames = andDestinations.concat(orDestinations);
      alertablePromise.title = `Alert for ${destinationNames.join(', ')}`;
      alertablePromise.onDashboard = false;

      if (destinationNames.includes('MTN')) {
        alertablePromise.contentType = 'Mtn';
      }
    }

    try {
      await alertablePromise.save();
      await alert.save();
      const alertTimeRanges = await alert.alertTimeRanges;
      await alertTimeRanges.save();
      this.notify.success('Alert saved successfully.');
      this.isOpen = false;
    } catch (error) {
      this.notify.alert('Alert could not be saved.');
    }
  }

  @action
  alertTypeChanged(value) {
    this.alert.alertType = value;
    if (this.isInstant) {
      this._toggleInstantTimeRange(true);
      this._toggleDigestTimeRanges(false);
    } else {
      this._toggleInstantTimeRange(false);
    }
  }

  @action
  onInstantTimeRangeStartChange(selection) {
    this.instantTimeRange.localStartAt = selection.value;
  }

  @action
  onInstantTimeRangeEndChange(selection) {
    this.instantTimeRange.localEndAt = selection.value;
  }

  @action
  searchOptions(query) {
    let rawOption = this.instantTimeRange.timeOptions.slice();
    return this.sifterSearch(
      query,
      rawOption,
      this.instantTimeRange.timeOptions,
      'label'
    );
  }

  sifterSearch(query, rawOptionList, optionList, fieldName) {
    let sifter = new Sifter(rawOptionList);
    let results = sifter.search(query, {
      fields: [fieldName],
      sort: [{ field: fieldName, direction: 'asc' }],
      limit: 15,
    });
    let opts = results.items.map((score) => optionList.at(score.id));
    return opts;
  }
}
