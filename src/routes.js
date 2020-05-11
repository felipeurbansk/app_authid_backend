const express = require('express');

/** Controllers */
const UserController = require('./api/controllers/UserController');
const DashboardController = require('./api/controllers/DashboardController');

/** Middlewares */
const AuthMiddleware = require('./api/middleware/auth')

/** Router */
const routes = express.Router();

/** Routes */
routes.post('/register', UserController.create);
routes.post('/auth', UserController.auth);
routes.post('/dashboard', AuthMiddleware,  DashboardController.index);

module.exports = routes;