import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { alias, equal, or } from '@ember/object/computed';
import { find, includes } from 'lodash';
import { memberAction } from 'ember-api-actions';

export default class UserModel extends Model {
  @belongsTo('account', { async: true, inverse: null }) account;
  @belongsTo('api-key', { async: true, inverse: 'user' }) apiKey;
  @hasMany('alert', { async: true, inverse: 'user' }) alerts;
  @hasMany('dashboard-item', { async: true, inverse: 'user' }) dashboardItems;
  @belongsTo('subscription', { async: true, inverse: 'users' }) subscription;

  @attr('number') alertsCount;
  @attr('string') biography;
  @attr('date', { serialize: false }) createdAt;
  @attr('number') cloneId;
  @attr('date', { serialize: false }) loginTime;
  @attr('utc') subscriptionStartOn;
  @attr('utc') subscriptionEndOn;
  @attr('string') email;
  @attr('string') firstName;
  @attr('boolean') hasVisitedDashboard;
  @attr('boolean') isActive;
  @attr('string') lastName;
  @attr('string') password;
  @attr('string') passwordConfirmation;
  @attr('boolean', { defaultValue: false }) clsWatchEntitled;
  @attr('boolean', { defaultValue: false }) clsFxEntitled;
  @attr('boolean', { defaultValue: false }) isSimpleEmailer;
  @attr('boolean', { defaultValue: false }) concurrentLoginEnabled;
  @attr({
    defaultValue() {
      return [
        'Credit',
        'CreditDatabases',
        'IIIA',
        'Rates',
        'FX',
        'G10 FX Playbook',
        'EM Playbook',
      ];
    },
  })
  permissions;

  @attr('string', { defaultValue: 'client' }) role;
  @attr('string', { defaultValue: 'Etc/UTC' }) timeZone;
  @attr('date', { serialize: false }) updatedAt;
  @attr('utc') expiredAt;

  get hasCredit() {
    return this.hasPermission('Credit');
  }

  get hasIIIA() {
    return this.hasPermission('IIIA');
  }

  get hasRates() {
    return this.hasPermission('Rates');
  }

  get hasFX() {
    return this.hasPermission('FX');
  }

  get hasCreditDatabases() {
    return this.hasPermission('CreditDatabases');
  }

  get hasG10FxPlaybook() {
    return this.hasPermission('G10 FX Playbook');
  }

  get hasEmPlaybook() {
    return this.hasPermission('EM Playbook');
  }

  hasPermission(name) {
    return includes(this.permissions, name);
  }

  @equal('role', 'account_manager') isAccountManager;
  @equal('role', 'admin') isAdmin;
  @equal('role', 'analyst') isAnalyst;
  @equal('role', 'client') isClient;
  @equal('role', 'editor') isEditor;

  // Role Permissions
  @or('isAdmin', 'isAccountManager') canAdmin;
  @or('isAdmin', 'isAnalyst') canAuthor;
  @or('isAdmin', 'isAnalyst', 'isEditor') canEditDeal;
  @or('isAdmin', 'isAnalyst', 'isEditor') canEditTechnical;
  @or('isAdmin', 'isAnalyst') canCreateCalendarEvent;
  @alias('canCreateCalendarEvent') canEditCalendarEvent;
  @or('isAdmin', 'isEditor') canCreateTags;
  @alias('canCreateTags') canEditTags;

  get canAccessDealVolumeLeagueSearch() {
    return !this.isClient || this.hasCreditDatabases;
  }

  get fullName() {
    return [this.firstName, this.lastName].join(' ');
  }

  get readablePermissions() {
    return this.permissions.join(', ');
  }

  @or('clsWatchEntitled', 'clsFxEntitled') canViewCls;

  get roleOption() {
    return find(this.roleOptions, { id: this.role });
  }

  roleOptions = [
    { id: 'admin', name: 'Admin' },
    { id: 'account_manager', name: 'Account Manager' },
    { id: 'analyst', name: 'Analyst' },
    { id: 'client', name: 'Client', accountManager: true },
    { id: 'editor', name: 'Editor' },
  ];

  unassignSubscription = memberAction({
    path: 'unassign_subscription',
    type: 'delete',
  });
}
