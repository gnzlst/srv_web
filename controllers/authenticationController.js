const CONTROLLER = {};
const PATH = require('path');
const LAYOUT = "administrator/layout/main";
const VIEW = PATH.join(__dirname, '..', 'views', 'administrator');
const PASSPORT = require('passport');

CONTROLLER.login = async(req, res, next) => {
    await PASSPORT.authenticate('local.signin', {
        successRedirect: '/hub',
        failureRedirect: '/',
        failureFlash: true
    })(req, res, next);
};

CONTROLLER.hub = (req, res, next) => {
    if (typeof req.user !== 'undefined' || req.user === null) {
        if (req.user.Role == 'administrator') {
            res.locals.metaTags = {
                title: "Dashboard",
                description: "Dashboard"
            };
            req.flash('success', 'Welcome!');
            res.redirect('/admin/dashboard');
        } else if (req.user.Role == 'lecturer') {
            res.locals.metaTags = {
                title: "Main",
                description: "Main"
            };
            req.flash('success', 'Welcome!');
            res.redirect('/lecturers/index');
        } else if (req.user.Role == 'student') {
            res.locals.metaTags = {
                title: "Dashboard",
                description: "Dashboard"
            };
            req.flash('success', 'Welcome!');
            res.redirect('/students/index');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/');
    }
}

module.exports = CONTROLLER;