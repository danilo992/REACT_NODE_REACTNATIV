const { Router } = require('express');
const DevController = require('./controlles/DevController')

const routes = Router();

routes.post('/devs', DevController.store);

module.exports = routes;