const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const INDEX_CONTROLLER = require(PATH.join(__dirname, '..', 'controllers', 'indexController'));
const { isNotLoggedIn } = require('../lib/auth');

ROUTER.get('/', isNotLoggedIn, INDEX_CONTROLLER.index);

module.exports = ROUTER;