// app/routes/alerts.js

import Route from '@ember/routing/route';

export default class AlertsRoute extends Route {
  model(params) {
    // Fetch the alert data based on the dynamic segment :alert_id
    return this.store.findRecord('alert', params.alert_id);
  }

  setupController(controller, model) {
    super.setupController(controller, model);
    // You can do additional setup here if needed
  }
}