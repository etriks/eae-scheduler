let express = require('express');
let os = require('os');
let app = express();

let config = require('../config/eae.scheduler.config.js');
let EaeScheduler = require('./eaeScheduler.js');

//Remove unwanted express headers
app.set('x-powered-by', false);

let options = Object.assign({}, config);
let scheduler = new EaeScheduler(options);

scheduler.start().then(function(scheduler_router) {
    app.use(scheduler_router);
    app.listen(config.port, function (error) {
        if (error) {
            console.error(error); // eslint-disable-line no-console
            return;
        }
        console.log(`Listening at http://${os.hostname()}:${config.port}/`); // eslint-disable-line no-console
    });
}, function(error) {
    console.error(error); // eslint-disable-line no-console
});