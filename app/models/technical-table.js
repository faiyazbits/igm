import { get } from '@ember/object';
import EmberObject from '@ember/object';
import TechnicalTableRow from './technical-table-row';

export default EmberObject.extend({
  data: null,

  get rows() {
    if (!this.data) {
      return [];
    }

    let r = 5;
    let s = 1;

    return this.data.map((row) => {
      let rowType = null;
      if (/^\s*[r]\s*$/i.test(row[0])) {
        rowType = `R${r--}`;
      } else if (/^\s*[s]\s*$/i.test(row[0])) {
        rowType = `S${s++}`;
      }

      return TechnicalTableRow.create({ rowType:rowType, data: row });
    });
  },

  get displayableRows() {
    return this.rows.filter((row) => row.displayable);
  },

  get reverseDisplayableRows() {
    const displayableRowsDupe = this.displayableRows.slice();
    return displayableRowsDupe.reverse();
  },
});
