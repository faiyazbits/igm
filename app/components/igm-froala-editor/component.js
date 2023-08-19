import Component from '@glimmer/component';
import { computed } from '@ember/object';
import { notEmpty } from '@ember/object/computed';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { service } from '@ember/service';

export default class IgmFroalaEditorComponent extends Component {
  @service session;

  hasError = notEmpty('errors');

  get options() {
    return {
      pluginsEnabled: [
        'customPlugin',
        'codeView',
        'paragraphFormat',
        'lists',
        'charCounter',
        'image',
        'video',
        'table',
        'file',
        'link',
        'align',
      ],
      heightMin: 400,
      toolbarButtons: [
        'html',
        'paragraphFormat',
        'bold',
        'italic',
        'strikeThrough',
        'formatUL',
        'formatOL',
        'outdent',
        'indent',
        'insertImage',
        'insertVideo',
        'insertTable',
        'insertFile',
        'insertLink',
        'alignLeft',
        'alignCenter',
        'alignRight',
        'alignJustify',
        'insertHR',
        'vendorLink',
      ],
    };
  }

  @computed('elementId')
  get uid() {
    const elementId = this.elementId;
    return `input-${elementId}`;
  }

  get safeValue() {
    return htmlSafe(this.args.value);
  }

  @action
  update(selection) {
    this.args.update(selection);
  }

  @action
  beforeImageUpload(editor) {
    const token = this.session.data.authenticated.access_token;

    editor.opts.imageUploadURL = `/api/v1/uploads?token=${token}`;
  }

  @action
  imageUploaded(editor, response) {
    let responseObj = JSON.parse(response);
    let img_url = responseObj.filelink;

    // Insert image.
    editor.image.insert(img_url, false, null, editor.image.get(), response);

    return false;
  }

  @action
  beforeUpload(editor) {
    const token = this.session.data.authenticated.access_token;
    editor.opts.fileUploadURL = `/api/v1/uploads?token=${token}`;
  }

  @action
  fileInserted(editor, response) {
    let responseObj = JSON.parse(response);
    let file_url = responseObj.filelink;
    let file_name = responseObj.filename;
    // Insert file.
    editor.file.insert(file_url, file_name, response);
    return false;
  }
}
