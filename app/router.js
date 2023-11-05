// app/router.js

import EmberRouter from '@ember/routing/router';
import config from 'igm-upgrade/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('stories', function () {
    this.route('new');
    this.route('show', { path: ':story_id' });
    this.route('versions', { path: ':story_id/versions' });
    this.route('edit', { path: ':story_id/edit' });
  });
  this.route('login');
  this.route('my-igm');
  this.route('forgot-password');
  this.route('about');
  this.route('help');
  this.route('author');

  this.route('alerts', { path: 'alerts/:alert_id' }); // Updated 'alert' route

  this.route('landing-page');
  this.route('mtns');
  this.route('deal', { path: 'deals/:deal_id' }, function () {
    this.route('tranche', { path: 'tranche/:tranche_id' });
  });
  this.route('deals', function () {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
  });
  this.route('tags', function () {
    this.route('edit', { path: ':tag_id/edit' });
  });
  this.route('issuers', function () {
    this.route('new');
    this.route('edit', { path: ':issuer_id/edit' });
  });
  this.route('deal-originators', function () {
    this.route('new');
    this.route('edit', { path: ':deal_originator_id/edit' });
  });
  this.route('banks', function () {
    this.route('new');
    this.route('edit', { path: ':bank_id/edit' });
  });

  this.route('destination-links');
  this.route('discover-page', { path: '/discover/:slug' });
  this.route('discover', function () {
    this.route('new-feed');
  });
  this.route('technicals', function () {
    this.route('new');
    this.route('show', { path: ':technical_id' });
    this.route('edit', { path: ':technical_id/edit' });
  });

  this.route('calendar-events', function () {
    this.route('new');
    this.route('edit', { path: '/:id/edit' });
  });

  this.route('feed', { path: 'feed/:feed_id' });

  this.route('technical-composites');
  this.route('technical-composite', {
    path: 'technical-composites/:technical_composite_id',
  });

  this.route('saved-search', { path: 'saved-search/:saved_search_id' });

  this.route('search');
  this.route('deal-search');
  this.route('volume-report-search');
  this.route('league-table-search');

  this.route('league-tables');

  this.route('settings', function () {
    this.route('account');
    this.route('alerts', function () {
      this.route('alert', { path:'/:19' });
    });
    this.route('feeds', function () {
      // this.route('new');
      this.route('edit', { path: ':feed_id/edit' });
    });
    // this.route('saved-searches');
  });
  this.route('league-table-search');
  this.route('users', function () {
    this.route('show', { path: ':user_id' });
    this.route('edit', { path: ':user_id/edit' });
  });
});