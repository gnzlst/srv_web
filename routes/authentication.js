const EXPRESS = require('express');
const ROUTER = EXPRESS.Router();
const PATH = require('path');
const AUTHENTICATION_CONTROLLER = require(PATH.join(__dirname, '..', 'controllers', 'authenticationController'));
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

ROUTER.post('/', AUTHENTICATION_CONTROLLER.login);

ROUTER.get('/logout', function(req, res) {
    req.logOut();
    req.session.destroy(function(err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
    /*req.session = null;
    res.redirect('/');*/
});

ROUTER.get('/hub', isLoggedIn, AUTHENTICATION_CONTROLLER.hub);

module.exports = ROUTER;