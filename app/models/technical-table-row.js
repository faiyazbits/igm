import { get } from '@ember/object';
import EmberObject from '@ember/object';

export default EmberObject.extend ({
  rowType : null,
  data : null,

  get cells() {
    return this.data;
  },

  get displayable() {
    return /^\s*[rsp]\s*$/i.test(this.cells[0]);
  },

  get valueCell() {
    return this.cellValue(1);
  },

  get commentCell() {
    return this.cellValue(2);
  },

  get isPriceRow() {
    return /^\s*[p]\s*$/i.test(this.cells[0]);
  },

  cellValue(index) {
    const cells = get(this, 'cells');
    if (cells) {
      return cells[index];
    }
    return null;
  }
});
