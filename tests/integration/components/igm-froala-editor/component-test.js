import { module, test } from 'qunit';
import { setupRenderingTest } from 'igm-upgrade/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | igm-froala-editor', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<IgmFroalaEditor />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <IgmFroalaEditor>
        template block text
      </IgmFroalaEditor>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
