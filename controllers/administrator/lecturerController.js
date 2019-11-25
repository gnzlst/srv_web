const CONTROLLER = {};
const PATH = require('path');
const LAYOUT = "administrator/layout/main"
const POOL = require('../../database');
const MY_LECTURER = require('../../models/user');
const VIEW = PATH.join(__dirname, '..', '..', 'views', 'administrator');
const PASSPORT = require('passport');

const TABLE = 'user';
const FIELD_ID = 'UserID';
const ROLE = 'lecturer';
const LIST = 'SELECT * FROM ' + TABLE + ' WHERE Role = "' + ROLE + '" AND DeletedAt IS NULL';
const INSERT = 'INSERT INTO ' + TABLE + ' SET ?';
const UPDATE = 'UPDATE ' + TABLE + ' SET ? WHERE ' + FIELD_ID + ' = ?';
const SOFT_DELETE = 'UPDATE ' + TABLE + ' SET DeletedAt = ? WHERE ' + FIELD_ID + ' = ?';

CONTROLLER.lecturers = async(req, res) => {
    const lecturers = await POOL.query(LIST);
    res.locals.metaTags = {
        title: "Lecturers Maintainer",
        description: "Lecturers Maintainer"
    };
    res.render(PATH.join(VIEW, 'lecturers'), { lecturers: lecturers, layout: LAYOUT });
};

CONTROLLER.addLecturer = async(req, res, next) => {
    req.body.role = ROLE;
    await PASSPORT.authenticate('local.signup', {
        successRedirect: '/admin/users/lecturers',
        failureRedirect: '/admin/users/lecturers',
        failureFlash: true
    })(req, res, next);
    res.locals.metaTags = {
        title: "Lecturers Maintainer",
        description: "Lecturers Maintainer"
    };
    req.flash('success', 'Lecturer saved successfully!');
};

CONTROLLER.deleteLecturer = async(req, res) => {
    const { id } = req.params;
    req.body.deletedAt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const { deletedAt } = req.body;
    await POOL.query(SOFT_DELETE, [deletedAt, id]);
    res.locals.metaTags = {
        title: "Lecturers Maintainer",
        description: "Lecturers Maintainer"
    };
    req.flash('success', 'Lecturer soft-deleted successfully!');
    res.redirect('/admin/users/lecturers');
};

CONTROLLER.updateLecturer = async(req, res) => {
    const { id } = req.params;
    req.body.updatedAt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const { emailAddress, givenName, lastName, updatedAt } = req.body;
    const UPDATE_LECTURER = { emailAddress, givenName, lastName, updatedAt };
    await POOL.query(UPDATE, [UPDATE_LECTURER, id]);
    res.locals.metaTags = {
        title: "Lecturers Maintainer",
        description: "Lecturers Maintainer"
    };
    req.flash('success', 'Lecturer updated successfully!');
    res.redirect('/admin/users/lecturers');
};

module.exports = CONTROLLER;