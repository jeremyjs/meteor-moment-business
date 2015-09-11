Package.describe({
  name: 'jjman505:moment-business',
  version: '2.0.0',
  // Brief, one-line summary of the package.
  summary: 'A wrapper for jmeas/moment-business',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/jjman505/meteor-moment-business',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.3');
  api.use('momentjs:moment@2.10.6');
  api.imply('momentjs:moment');
  api.addFiles('dist/contained-periodic-values.js', ['client', 'server']);
  api.addFiles('dist/moment-business.js', ['client', 'server']);
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('jjman505:moment-business');
  api.addFiles('moment-business-tests.js');
});
