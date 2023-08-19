'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  var deployTarget = process.env.DEPLOY_TARGET || 'development';
  var env = EmberApp.env() || 'development';
  if (env === 'test') {
    deployTarget = env;
  }
  var isProductionLikeBuild =
    ['production', 'staging', 'dev', 'qa'].indexOf(deployTarget) > -1;

  var fingerprintOptions = {
    enabled: true,
    extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map'],
  };

  switch (deployTarget) {
    case 'development':
      fingerprintOptions.prepend = 'http://localhost:4200/';
      break;
    case 'staging':
      fingerprintOptions.prepend = 'https://d199j4qz6yr8i1.cloudfront.net/';
      break;
    case 'production':
      fingerprintOptions.prepend = 'https://ddn74v4uiiore.cloudfront.net/';
      break;
    case 'dev':
      fingerprintOptions.prepend = 'https://d1gwttuigt2tg5.cloudfront.net/';
    break;
    case 'qa':
      fingerprintOptions.prepend = 'https://dzl1zqll0ozk1.cloudfront.net/';
    break;
  }
  const app = new EmberApp(defaults, {
    fingerprint: fingerprintOptions,

    autoImport: {
      webpack: {
        output: {
          filename: (chunkData) => {
            return chunkData.chunk.name === 'main' ? '[name].js': '[name]/[name].js';
          },
        }
      }
    },
    emberCLIDeploy: {
      runOnPostBuild:
        deployTarget === 'development' ? 'development-postbuild' : false,
      shouldActivate: true,
    },
    sourcemaps: {
      enabled: true,
      extensions: ['js'],
    },
    minifyCSS: { enabled: isProductionLikeBuild },
    minifyJS: { enabled: isProductionLikeBuild },
    tests: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
    hinting: process.env.EMBER_CLI_TEST_COMMAND || !isProductionLikeBuild,
    // Add options here
    'ember-simple-auth': {
      useSessionSetupMethod: true,
    },
    'ember-froala-editor': {
      languages: ['es', 'fr', 'de'],
      plugins: [
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
      themes: ['royal'],
      imageUploadParam: 'file',

      // Set the image upload URL.
      imageUploadURL: '/api/v1/uploads',

      // Additional upload params.
      imageUploadParams: { image: true },

      // Set request type.
      imageUploadMethod: 'POST',

      // Set max image size to 5MB.
      imageMaxSize: 5 * 1024 * 1024,

      // Allow to upload PNG and JPG.
      imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    },
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  // Include Froala Editor CSS
  app.import('node_modules/froala-editor/css/froala_editor.pkgd.min.css');
  // Include Froala Editor JS
  app.import('node_modules/froala-editor/js/froala_editor.pkgd.min.js');

  app.import('node_modules/bootstrap-sass/assets/javascripts/bootstrap.js');
  app.import('vendor/faye-browser.js');

  app.import('node_modules/clipboard/dist/clipboard.min.js');

  return app.toTree();
};
