import { module, test } from 'qunit';
import { setupTest } from 'igm-upgrade/tests/helpers';

module('Unit | Route | banks/new', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:banks/new');
    assert.ok(route);
  });
});
