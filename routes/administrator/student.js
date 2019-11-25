const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const STUDENT_CONTROLLER = require(PATH.join(__dirname, '..', '..', 'controllers', 'administrator', 'studentController'));
const { isLoggedIn } = require('../../lib/auth');

ROUTER.get('/users/students', isLoggedIn, STUDENT_CONTROLLER.students);
ROUTER.post('/users/students/add', isLoggedIn, STUDENT_CONTROLLER.addStudent);
ROUTER.post('/users/students/delete/:id', isLoggedIn, STUDENT_CONTROLLER.deleteStudent);
ROUTER.post('/users/students/update/:id', isLoggedIn, STUDENT_CONTROLLER.updateStudent);

module.exports = ROUTER;