const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const STUDENT_CONTROLLER = require(PATH.join(__dirname, '..', '..', 'controllers', 'student', 'studentController'));
const { isLoggedIn } = require('../../lib/auth');
const { isStudent } = require('../../lib/auth');

ROUTER.get('/index', isLoggedIn, isStudent, STUDENT_CONTROLLER.index);

ROUTER.post('/index', isLoggedIn, isStudent, STUDENT_CONTROLLER.parchmentRequest);

module.exports = ROUTER;