import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { get } from '@ember/object';
import { alias } from '@ember/object/computed';
import { service } from '@ember/service';
import { orderBy } from 'lodash';
import TechnicalTable from './technical-table';


export default class TechnicalModel extends Model {
  @service store;

  @belongsTo('destination', { async: true, inverse: null }) assetType;
  @hasMany('commentary', { async: true, inverse: 'technical' }) commentaries;
  @belongsTo('destination', { async: true, inverse: null }) currency;
  @hasMany('destination', { async: true, inverse: null }) destinations;
  @belongsTo('user', { async: true, inverse: null }) user;

  @attr('string') name;
  @attr('string') tableData;
  @attr('string') strategy;
  @attr('string') email;
  @attr('date') feedSortDate;
  @attr('boolean', { defaultValue: false }) resendAlerts;

  get commentariesSorted() {
    return this.commentaries.then((commentaries) => {
      return orderBy(commentaries, 'createdAt', 'desc');
    });
  }

  @alias('name') headline;

  get tableDataArray() {
    const tableData = this.tableData;

    if (tableData) {
      return JSON.parse(tableData);
    } else {
      return [];
    }
  }

  get table() {
    return TechnicalTable.create({ data: get(this, 'tableDataArray') });
  }
}
