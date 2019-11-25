const CONTROLLER = {};
const PATH = require('path');
const LAYOUT = "administrator/layout/main"
const POOL = require('../../database');
const MY_STUDENT = require('../../models/user');
const VIEW = PATH.join(__dirname, '..', '..', 'views', 'administrator');
const PASSPORT = require('passport');

const TABLE = 'user';
const FIELD_ID = 'UserID';
const ROLE = 'student';
const LIST = 'SELECT * FROM ' + TABLE + ' WHERE Role = "' + ROLE + '" AND DeletedAt IS NULL';
const INSERT = 'INSERT INTO ' + TABLE + ' SET ?';
const UPDATE = 'UPDATE ' + TABLE + ' SET ? WHERE ' + FIELD_ID + ' = ?';
const SOFT_DELETE = 'UPDATE ' + TABLE + ' SET DeletedAt = ? WHERE ' + FIELD_ID + ' = ?';

CONTROLLER.students = async(req, res) => {
    const students = await POOL.query(LIST);
    res.locals.metaTags = {
        title: "Students Maintainer",
        description: "Students Maintainer"
    };
    res.render(PATH.join(VIEW, 'students'), { students: students, layout: LAYOUT });
};

CONTROLLER.addStudent = async(req, res, next) => {
    req.body.role = ROLE;
    await PASSPORT.authenticate('local.signup', {
        successRedirect: '/admin/users/students',
        failureRedirect: '/admin/users/students',
        failureFlash: true
    })(req, res, next);
    res.locals.metaTags = {
        title: "Students Maintainer",
        description: "Students Maintainer"
    };
    req.flash('success', 'Student saved successfully!');
};

CONTROLLER.deleteStudent = async(req, res) => {
    const { id } = req.params;
    req.body.deletedAt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const { deletedAt } = req.body;
    await POOL.query(SOFT_DELETE, [deletedAt, id]);
    res.locals.metaTags = {
        title: "Students Maintainer",
        description: "Students Maintainer"
    };
    req.flash('success', 'Student soft-deleted successfully!');
    res.redirect('/admin/users/students');
};

CONTROLLER.updateStudent = async(req, res) => {
    const { id } = req.params;
    req.body.updatedAt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const { emailAddress, givenName, lastName, updatedAt } = req.body;
    const UPDATE_STUDENT = { emailAddress, givenName, lastName, updatedAt };
    await POOL.query(UPDATE, [UPDATE_STUDENT, id]);
    res.locals.metaTags = {
        title: "Students Maintainer",
        description: "Students Maintainer"
    };
    req.flash('success', 'Student updated successfully!');
    res.redirect('/admin/users/students');
};

module.exports = CONTROLLER;