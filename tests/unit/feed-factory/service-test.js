import { module, test } from 'qunit';
import { setupTest } from 'igm-upgrade/tests/helpers';

module('Unit | Service | feed-factory', function (hooks) {
  setupTest(hooks);

  // TODO: Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:feed-factory');
    assert.ok(service);
  });
});
