const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const LECTURER_CONTROLLER = require(PATH.join(__dirname, '..', '..', 'controllers', 'lecturer', 'lecturerController'));
const { isLoggedIn } = require('../../lib/auth');
const { isLecturer } = require('../../lib/auth');

ROUTER.get('/index', isLoggedIn, isLecturer, LECTURER_CONTROLLER.index);
ROUTER.get('/viewDetails/:id', isLoggedIn, isLecturer, LECTURER_CONTROLLER.viewDetails);

module.exports = ROUTER;