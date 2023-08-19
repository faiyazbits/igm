/* jshint node: true */

module.exports = function(environment) {
  var deployTarget = process.env.DEPLOY_TARGET || 'development';
  var ENV = {
    modulePrefix: 'igm-upgrade',
    currentRevision: '2020-07-17-21-22-00',
    environment: deployTarget,
    rootURL: '/',
    locationType: 'history',
    gaWebPropertyId: null,
    enableEloqua: null,
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },
    featureFlags: {
      'realtime-feeds': true
    }
  };
  // Token for Feeds API Throttle Bypass (Must match server)
  ENV.request_source_token = 'ab79ae83e1ee422742ad3';
  ENV.contentSecurityPolicy = {
    'font-src': "'self' data: *.googleapis.com *.gstatic.com fontastic.s3.amazonaws.com informa.s3.amazonaws.com",
    'img-src': "'self' data: *.eloqua.com *.googleapis.com *.gstatic.com *.google-analytics.com informa.s3.amazonaws.com",
    'script-src': "'self' *.en25.com *.eloqua.com *.googleapis.com *.gstatic.com *.google-analytics.com localhost:9292",
    'style-src': "'self' 'unsafe-inline' *.googleapis.com *.gstatic.com fontastic.s3.amazonaws.com",
    'object-src': "'self'",
    'connect-src': "'self' ws://localhost:9292/faye *.google-analytics.com"
  };
  ENV['ember-full-story'] = {
    org: 'P9EK'
  };
  ENV['ember-simple-auth'] = {
    routeAfterAuthentication: 'my-igm',
    routeIfAlreadyAuthenticated: 'my-igm'
  };
  if (deployTarget === 'development' && environment !== 'test') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    ENV.contentSecurityPolicy['script-src'] = ENV.contentSecurityPolicy['script-src'] + " 'unsafe-eval' 'unsafe-inline'";
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.faye_address = 'https://ws.novusstg.informagm.com/faye';
    // ENV.featureFlags['realtime-feeds'] = true;
  }
  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    // use the ephemeral session store for the test environment as otherwise
    // the session will be persisted and tests might influence each other.
    ENV['simple-auth'] = {
      store: 'simple-auth-session-store:ephemeral'
    };
  }
  if (deployTarget === 'staging') {
    ENV.faye_address = 'https://ws.novusstg.informagm.com/faye';
    ENV.gaWebPropertyId = 'UA-58549890-1';
    //ENV['bugsnag'] = {
    //  apiKey: 'c14f98637423cb123b692ffc101a76eb',
    //  releaseStage: 'staging',
    //  notifyReleaseStages: ['staging']
    //}
  }
  if (deployTarget === 'production') {
    ENV.faye_address = 'https://ws.informagm.com/faye';
    ENV.gaWebPropertyId = 'UA-58549890-1';
    ENV.enableEloqua = true;
    //ENV['bugsnag'] = {
    //  apiKey: 'c14f98637423cb123b692ffc101a76eb',
    //  releaseStage: 'production',
    //  notifyReleaseStages: ['production']
    //}
  }
  if (deployTarget === 'dev') {
    ENV.faye_address = 'https://ws.dev1.informagm.com/faye';
    ENV.gaWebPropertyId = 'UA-58549890-1';
    //ENV['bugsnag'] = {
    //  apiKey: 'c14f98637423cb123b692ffc101a76eb',
    //  releaseStage: 'staging',
    //  notifyReleaseStages: ['staging']
    //}
  }
  if (deployTarget === 'qa') {
    ENV.faye_address = 'https://ws.qa.informagm.com/faye';
    ENV.gaWebPropertyId = 'UA-58549890-1';
    //ENV['bugsnag'] = {
    //  apiKey: 'c14f98637423cb123b692ffc101a76eb',
    //  releaseStage: 'staging',
    //  notifyReleaseStages: ['staging']
    //}
  }
  return ENV;
};