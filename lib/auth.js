module.exports = {
    isLoggedIn(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/');
    },
    isAdministrator(req, res, next) {
        if (req.user.Role == 'administrator') {
            return next();
        }
        return res.redirect('/hub');
    },
    isLecturer(req, res, next) {
        if (req.user.Role == 'lecturer') {
            return next();
        }
        return res.redirect('/hub');
    },
    isStudent(req, res, next) {
        if (req.user.Role == 'student') {
            return next();
        }
        return res.redirect('/hub');
    },
    isNotLoggedIn(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.redirect('/hub');
    }
};