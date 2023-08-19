import { module, test } from 'qunit';
import { setupTest } from 'igm-upgrade/tests/helpers';

module('Unit | Controller | banks/new', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let controller = this.owner.lookup('controller:banks/new');
    assert.ok(controller);
  });
});
