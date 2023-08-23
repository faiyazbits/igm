// app/controllers/alerts.js

import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class AlertsController extends Controller {
  currentUser = {
    isAlertPaused: false,
    // ... other user data ...
  };

  timeZones = [
    'Time Zone 1',
    'Time Zone 2',
    // ... other time zones ...
  ];

  alerts = [
    // ... sample alert data ...
  ];

  @action
  saveTimeZone() {
    // Implementation of saveTimeZone action
    // For example, you can save the selected time zone for the user
  }

  @action
  updateAlertPause(status) {
    // Implementation of updateAlertPause action
    // For example, update the isAlertPaused status for the user
  }

  @action
  deleteAlert(alert) {
    // Implementation of deleteAlert action
    // For example, remove the specified alert from the alerts array
  }
}