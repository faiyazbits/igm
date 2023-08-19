import { module, test } from 'qunit';
import { setupTest } from 'igm-upgrade/tests/helpers';

module('Unit | Route | tags', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:tags');
    assert.ok(route);
  });
});
