const PASSPORT = require('passport');
const LOCAL_STRATEGY = require('passport-local').Strategy;

const POOL = require('../database');
const HELPERS = require('./helpers');

const MY_USER = require('../models/user');
const TABLE = 'user';
const INSERT = 'INSERT INTO ' + TABLE + ' SET ?';
const SELECT = 'SELECT * FROM ' + TABLE + ' WHERE EmailAddress = ?';

PASSPORT.use('local.signin', new LOCAL_STRATEGY({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, email, password, done) => {
    const rows = await POOL.query(SELECT, [email]);
    if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await HELPERS.matchPassword(password, user.Password)
        if (validPassword) {
            done(null, user, req.flash('success', ' Welcome ' + user.GivenName));
        } else {
            done(null, false, req.flash('message', 'Incorrect Password'));
        }
    } else {
        return done(null, false, req.flash('message', 'The Username does not exists.'));
    }
}));

PASSPORT.use('local.signup', new LOCAL_STRATEGY({
    usernameField: 'emailAddress',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, emailAddress, password, done) => {
    req.body.password = await HELPERS.encryptPassword(password);
    MY_USER.User(req.body.userId, req.body.givenName, req.body.lastName, req.body.emailAddress, req.body.password, req.body.role);
    const result = await POOL.query(INSERT, [MY_USER]);
    //MY_USER.userid = result.insertId;
    return done(null, null);
}));

PASSPORT.serializeUser((user, done) => {
    done(null, user.UserID);
});

PASSPORT.deserializeUser(async(id, done) => {
    const rows = await POOL.query('SELECT * FROM ' + TABLE + ' WHERE UserID = ?', [id]);
    done(null, rows[0]);
});