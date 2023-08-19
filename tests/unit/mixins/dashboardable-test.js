import EmberObject from '@ember/object';
import DashboardableMixin from 'igm-upgrade/mixins/dashboardable';
import { module, test } from 'qunit';

module('Unit | Mixin | dashboardable', function () {
  // TODO: Replace this with your real tests.
  test('it works', function (assert) {
    let DashboardableObject = EmberObject.extend(DashboardableMixin);
    let subject = DashboardableObject.create();
    assert.ok(subject);
  });
});
