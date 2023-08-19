import FroalaEditor from 'froala-editor';

export function initialize(application) {
  // Define popup template.
  FroalaEditor.POPUP_TEMPLATES['customPlugin.popup'] =
    '[_CUSTOM_LAYER_][_BUTTONS_]';

  // Define popup buttons.
  Object.assign(FroalaEditor.DEFAULTS, {
    popupButtons: ['popupClose', 'popupInsert', 'popupCloseButton'],
  });

  // The custom popup is defined inside a plugin (new or existing).
  FroalaEditor.PLUGINS.customPlugin = function (editor) {
    // Create custom popup.
    function initPopup() {
      // Popup buttons.
      var popup_buttons = '';

      // Create the list of buttons.
      if (editor.opts.popupButtons.length > 1) {
        popup_buttons += '<div class="fr-buttons">';
        popup_buttons += editor.button.buildList(editor.opts.popupButtons);
        popup_buttons += '</div>';
      }
      // Load popup template.
      var template = {
        buttons: popup_buttons,
        custom_layer:
          '<div id="modal-box" >' +
          '<div id="modal" style="width: 700px; margin-top: 20px;">' +
          '<header>Vendor Link</header>' +
          '<div id="modal-body"></div>' +
          '<section id="modal-vendorlinker-insert">' +
          '<label>Bloomberg Page</label>' +
          '<input type="text" id="insert-bloomberg-input" style="width: 100%;"></textarea>' +
          '<label>Reuters Page</label>' +
          '<input type="text" id="insert-reuters-input" style="width: 100%;"></textarea>' +
          '<label>Web Page Link</label>' +
          '<input type="text" id="insert-web-input" style="width: 100%;"></textarea>' +
          '<label>Web Page Name</label>' +
          '<input type="text" id="insert-web-name-input" style="width: 100%;"></textarea>' +
          '</section>' +
          '</div>' +
          '</div>' +
          '</div>',
      };

      // Create popup.
      var $popup = editor.popups.create('customPlugin.popup', template);

      return $popup;
    }

    // Show the popup
    function showPopup() {
      // Get the popup object defined above.
      var $popup = editor.popups.get('customPlugin.popup');

      // If popup doesn't exist then create it.
      // To improve performance it is best to create the popup when it is first needed
      // and not when the editor is initialized.
      if (!$popup) $popup = initPopup();

      // Set the editor toolbar as the popup's container.
      editor.popups.setContainer('customPlugin.popup', editor.$tb);

      // This will trigger the refresh event assigned to the popup.
      // editor.popups.refresh('customPlugin.popup');

      // This custom popup is opened by pressing a button from the editor's toolbar.
      // Get the button's object in order to place the popup relative to it.
      var $btn = editor.$tb.find('.fr-command[data-cmd="vendorLink"]');

      // Set the popup's position.
      var left = $btn.offset().left - 450 + $btn.outerWidth() / 2;
      var top =
        $btn.offset().top +
        (editor.opts.toolbarBottom ? 10 : $btn.outerHeight() - 10);

      // Show the custom popup.
      // The button's outerHeight is required in case the popup needs to be displayed above it.
      editor.popups.show('customPlugin.popup', left, top, $btn.outerHeight());
    }

    // Hide the custom popup.
    function hidePopup() {
      editor.popups.hide('customPlugin.popup');
    }

    // Methods visible outside the plugin.
    return {
      showPopup: showPopup,
      hidePopup: hidePopup,
    };
  };

  // Define an icon and command for the button that opens the custom popup.
  FroalaEditor.DefineIcon('vendorLink', { NAME: 'V', template: 'text' });
  FroalaEditor.RegisterCommand('vendorLink', {
    title: 'Vendor link',
    icon: 'V',
    undo: false,
    focus: false,
    plugin: 'customPlugin',
    callback: function () {
      this.customPlugin.showPopup();
    },
  });

  // Define custom popup close button icon and command.
  FroalaEditor.DefineIcon('popupClose', { NAME: 'Cancel', template: 'text' });
  FroalaEditor.RegisterCommand('popupClose', {
    title: 'Cancel',
    icon: 'Cancel',
    undo: false,
    focus: false,
    callback: function () {
      this.customPlugin.hidePopup();
    },
  });

  // Define custom popup 1.
  FroalaEditor.DefineIcon('popupInsert', { NAME: 'Insert', template: 'text' });
  FroalaEditor.RegisterCommand('popupInsert', {
    title: 'Insert',
    icon: 'Insert',
    undo: false,
    focus: false,
    callback: function () {
      var bloomberg = document.getElementById('insert-bloomberg-input').value;
      var reuters = document.getElementById('insert-reuters-input').value;
      var web = document.getElementById('insert-web-input').value;
      var webName = document.getElementById('insert-web-name-input').value;

      var data =
        '<div class=customPop >' +
        '<vendor>' +
        '<bloomberg>' +
        bloomberg +
        '</bloomberg> ' +
        '<divider>/</divider>' +
        '<reuters>' +
        reuters +
        '</reuters> ' +
        '<divider>/</divider>' +
        '<web><a href="' +
        web +
        '">' +
        webName +
        '</a></web>' +
        '</vendor>' +
        '</div>';

      this.html.insert(data);

      this.customPlugin.hidePopup();
    },
  });

  // Define custom popup 2.
  FroalaEditor.DefineIcon('popupCloseButton', {
    NAME: 'Close',
    SVG_KEY: 'close',
  });
  FroalaEditor.RegisterCommand('popupCloseButton', {
    title: 'Close',
    undo: false,
    focus: false,
    callback: function () {
      this.customPlugin.hidePopup();
    },
  });
}

export default {
  initialize,
};
