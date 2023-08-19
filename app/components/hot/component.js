import Component from '@glimmer/component';
import { getOwner } from '@ember/application';
import { guidFor } from '@ember/object/internals';
import { scheduleOnce } from '@ember/runloop';
import Handsontable from 'handsontable';
import { tracked } from '@glimmer/tracking';

const NAMESPACE = 'hot-table-';

export default class HotComponent extends Component {
  @tracked tableData = null;

  @tracked
  hotInstance = null;

  options = {
    width: 400,
    colWidths: [50, 80, 220],
    startRows: 20,
    startCols: 3,
    minRows: 20,
    minCols: 3,
    rowHeaders: false,
    colHeaders: ['r/s/p', 'price', 'comment'],
    minSpareRows: 0,
    contextMenu: true,
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: function (changes, source) {
      if (this.hotInstance) {
        this._onChange();
      }
    }.bind(this),
  };

  constructor() {
    super(...arguments);

    this.id = `${NAMESPACE}${guidFor(this)}`;
    this.tableData = this.args.data;

    scheduleOnce('afterRender', this, this.initializeGrid);
  }

  _onChange() {
    if (this.args.onChange == null) {
      throw new Error('Mandatory Change handler not passed for handsontable');
    }
    let dataString = JSON.stringify(this.hotInstance.getData());
    this.args.onChange(dataString);
  }

  _mergeConfigs() {
    let config = getOwner(this).resolveRegistration('config:environment');

    return Object.assign({}, config['ember-handsontable'], this.options, {
      data: JSON.parse(this.args.data),
    });
  }

  async initializeGrid() {
    const container = document.getElementById(this.id);

    const HOTable = new Handsontable(container, this._mergeConfigs());
    this.hotInstance = HOTable;
    return this.onInit(HOTable);
  }

  onInit() {
    this.args.onInit && this.args.onInit(...arguments);
  }
}
