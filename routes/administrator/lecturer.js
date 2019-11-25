const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const LECTURER_CONTROLLER = require(PATH.join(__dirname, '..', '..', 'controllers', 'administrator', 'lecturerController'));
const { isLoggedIn } = require('../../lib/auth');

ROUTER.get('/users/lecturers', isLoggedIn, LECTURER_CONTROLLER.lecturers);
ROUTER.post('/users/lecturers/add', isLoggedIn, LECTURER_CONTROLLER.addLecturer);
ROUTER.post('/users/lecturers/delete/:id', isLoggedIn, LECTURER_CONTROLLER.deleteLecturer);
ROUTER.post('/users/lecturers/update/:id', isLoggedIn, LECTURER_CONTROLLER.updateLecturer);

module.exports = ROUTER;