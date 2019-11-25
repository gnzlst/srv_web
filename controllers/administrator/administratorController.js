const CONTROLLER = {};
const PATH = require('path');
const LAYOUT = "administrator/layout/main"
const POOL = require('../../database');
const MY_ADMINISTRATOR = require('../../models/user');
const VIEW = PATH.join(__dirname, '..', '..', 'views', 'administrator');
const PASSPORT = require('passport');

const TABLE_USER = 'user';
const TABLE_STUDENT_GRADE = 'student_grade';
const FIELD_ID = 'UserID';
const ROLE_ADMIN = 'administrator';
const ROLE_LECTURER = 'lecturer';
const ROLE_STUDENT = 'student';
const LIST = 'SELECT * FROM ' + TABLE_USER + ' WHERE Role = "' + ROLE_ADMIN + '" AND DeletedAt IS NULL';
const INSERT = 'INSERT INTO ' + TABLE_USER + ' SET ?';
const UPDATE = 'UPDATE ' + TABLE_USER + ' SET ? WHERE ' + FIELD_ID + ' = ?';
const SOFT_DELETE = 'UPDATE ' + TABLE_USER + ' SET DeletedAt = ? WHERE ' + FIELD_ID + ' = ?';

const TOTAL_ADMINISTRATORS = 'SELECT COUNT(' + FIELD_ID + ') as TotalAdministrators FROM ' + TABLE_USER + ' WHERE Role = "' + ROLE_ADMIN + '" AND DeletedAt IS NULL';
const TOTAL_LECTURERS = 'SELECT COUNT(' + FIELD_ID + ') as TotalLecturers FROM ' + TABLE_USER + ' WHERE Role = "' + ROLE_LECTURER + '" AND DeletedAt IS NULL';
const TOTAL_STUDENTS = 'SELECT COUNT(' + FIELD_ID + ') as TotalStudents FROM ' + TABLE_USER + ' WHERE Role = "' + ROLE_STUDENT + '" AND DeletedAt IS NULL';

const PARCHMENT_READY = 'SELECT ' + FIELD_ID + ' AS parchmentReadyTotal FROM ' + TABLE_STUDENT_GRADE + ' GROUP BY ' + FIELD_ID + ' HAVING ROUND(((AVG(Grade = "PA")) * 100),2) >= 100';
const PARCHMENT_NOT_READY = 'SELECT ' + FIELD_ID + ' AS parchmentNotReadyTotal FROM ' + TABLE_STUDENT_GRADE + ' GROUP BY ' + FIELD_ID + ' HAVING ROUND(((AVG(Grade = "PA")) * 100),2) < 100';

const PARCHMENT_REQUESTED = 'SELECT COUNT(' + FIELD_ID + ') AS parchmentRequestedFromDB FROM ' + TABLE_USER + ' WHERE ParchmentRequest = 1 AND Role = "' + ROLE_STUDENT + '"';
const PARCHMENT_NOT_REQUESTED = 'SELECT COUNT(' + FIELD_ID + ') AS parchmentNotRequestedFromDB FROM ' + TABLE_USER + ' WHERE ParchmentRequest = 0 AND Role = "' + ROLE_STUDENT + '"';

const TOTAL_CAMPUSES = 'SELECT COUNT(*) AS campusesFromDB FROM campus WHERE 1';
const TOTAL_QUALIFICATIONS = 'SELECT COUNT(*) AS qualificationsFromDB FROM qualification WHERE 1';
const TOTAL_COMPETENCIES = 'SELECT COUNT(*) AS competenciesFromDB FROM competency WHERE 1';
const TOTAL_SUBJECTS = 'SELECT COUNT(*) AS subjectsFromDB FROM subject WHERE 1';

CONTROLLER.dashboard = async(req, res) => {
    const totalAdministators = await POOL.query(TOTAL_ADMINISTRATORS);
    const totalLecturers = await POOL.query(TOTAL_LECTURERS);
    const totalStudents = await POOL.query(TOTAL_STUDENTS);
    const parchmentReady = await POOL.query(PARCHMENT_READY);
    const parchmentNotReady = await POOL.query(PARCHMENT_NOT_READY);
    const parchmentRequested = await POOL.query(PARCHMENT_REQUESTED);
    const parchmentNotRequested = await POOL.query(PARCHMENT_NOT_REQUESTED);
    const campuses = await POOL.query(TOTAL_CAMPUSES);
    const qualifications = await POOL.query(TOTAL_QUALIFICATIONS);
    const competencies = await POOL.query(TOTAL_COMPETENCIES);
    const subjects = await POOL.query(TOTAL_SUBJECTS);

    res.locals.metaTags = {
        title: "Dashboard",
        description: "Dashboard"
    };
    res.render(PATH.join(VIEW, 'index'), {
        totalAdministators: totalAdministators,
        totalLecturers: totalLecturers,
        totalStudents: totalStudents,
        parchmentReady: parchmentReady,
        parchmentNotReady: parchmentNotReady,
        parchmentRequested: parchmentRequested,
        parchmentNotRequested: parchmentNotRequested,
        campuses: campuses,
        qualifications: qualifications,
        competencies: competencies,
        subjects: subjects,
        layout: LAYOUT,
        user: req.user.username
    });
};

CONTROLLER.administrators = async(req, res) => {
    const administrators = await POOL.query(LIST);
    res.locals.metaTags = {
        title: "Administrators Maintainer",
        description: "Administrators Maintainer"
    };
    res.render(PATH.join(VIEW, 'administrators'), { administrators: administrators, layout: LAYOUT });
};

CONTROLLER.addAdministrator = async(req, res, next) => {
    req.body.role = ROLE_ADMIN;
    await PASSPORT.authenticate('local.signup', {
        successRedirect: '/admin/users/administrators',
        failureRedirect: '/admin/users/administrators',
        failureFlash: true
    })(req, res, next);
    res.locals.metaTags = {
        title: "Administrators Maintainer",
        description: "Administrators Maintainer"
    };
    req.flash('success', 'Administrator saved successfully!');
};

CONTROLLER.deleteAdministrator = async(req, res) => {
    const { id } = req.params;
    req.body.deletedAt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const { deletedAt } = req.body;
    await POOL.query(SOFT_DELETE, [deletedAt, id]);
    res.locals.metaTags = {
        title: "Administrators Maintainer",
        description: "Administrators Maintainer"
    };
    req.flash('success', 'Administrator soft-deleted successfully!');
    res.redirect('/admin/users/administrators');
};

CONTROLLER.updateAdministrator = async(req, res) => {
    const { id } = req.params;
    req.body.updatedAt = require('moment')().format('YYYY-MM-DD HH:mm:ss');
    const { emailAddress, givenName, lastName, updatedAt } = req.body;
    const UPDATE_ADMINISTRATOR = { emailAddress, givenName, lastName, updatedAt };
    await POOL.query(UPDATE, [UPDATE_ADMINISTRATOR, id]);
    res.locals.metaTags = {
        title: "Administrators Maintainer",
        description: "Administrators Maintainer"
    };
    req.flash('success', 'Administrator updated successfully!');
    res.redirect('/admin/users/administrators');
};

module.exports = CONTROLLER;