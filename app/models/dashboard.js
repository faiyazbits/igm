import Model, { hasMany } from '@ember-data/model';

export default class DashboardModel extends Model {
  @hasMany('dashboard-item', { async: true, inverse: 'dashboard' })
  dashboardItems;
}
