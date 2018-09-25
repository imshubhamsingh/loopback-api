'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var chalk = require('chalk');
var app = (module.exports = loopback());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    process.stdout.write(chalk.magenta(`💻  API started on ${baseUrl}/api`));
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      process.stdout.write(
        chalk.magenta(`\n📖  API Documentation on ${baseUrl}/${explorerPath}\n`)
      );
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module) app.start();
});
