const EXPRESS = require('express');
const PATH = require('path');
const MORGAN = require('morgan');
const EXPRESS_HANDLEBARS = require('express-handlebars');
const flash = require('connect-flash');
const EXPRESS_SESSION = require('express-session');
const EXPRESS_MYSQL_SESSION = require('express-mysql-session');
const PASSPORT = require('passport');
const { database } = require('./keys');

// Directories
const CONTROLLERS = PATH.join(__dirname, 'controllers');
const LIB = PATH.join(__dirname, 'lib');
const MODELS = PATH.join(__dirname, 'models');
const PUBLIC = PATH.join(__dirname, 'public');
const ROUTES = PATH.join(__dirname, 'routes');
const VIEWS = PATH.join(__dirname, 'views');

// Initialize
const MY_APP = EXPRESS();
require('./lib/passport');

// Settings
MY_APP.set('port', process.env.PORT || 4000);

MY_APP.engine('.hbs', EXPRESS_HANDLEBARS({
    defaultLayout: 'main',
    layoutsDir: PATH.join(VIEWS, 'layout'),
    partialsDir: PATH.join(VIEWS, 'layout', 'partials'),
    extname: '.hbs',
    helpers: require(PATH.join(LIB, 'handlebars'))
}));
MY_APP.set('view engine', '.hbs');

// Middlewares
MY_APP.use(EXPRESS_SESSION({
    secret: 'srvapplicationfortafesateamnag2019',
    cookie: { maxAge: 1 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: false,
    store: new EXPRESS_MYSQL_SESSION(database)
}));
MY_APP.use(flash());
MY_APP.use(MORGAN('dev'));
MY_APP.use(EXPRESS.urlencoded({ extended: false }));
MY_APP.use(EXPRESS.json());
MY_APP.use(PASSPORT.initialize());
MY_APP.use(PASSPORT.session());

// Global variables
MY_APP.use((req, res, next) => {
    MY_APP.locals.success = req.flash('success');
    MY_APP.locals.message = req.flash('message');
    MY_APP.locals.user = req.user;
    next();
});

// Routes
MY_APP.use(require(PATH.join(ROUTES, 'index')));
MY_APP.use(require(PATH.join(ROUTES, 'authentication')));

MY_APP.use('/admin', require(PATH.join(ROUTES, 'administrator', 'administrator')));
MY_APP.use('/admin', require(PATH.join(ROUTES, 'administrator', 'lecturer')));
MY_APP.use('/admin', require(PATH.join(ROUTES, 'administrator', 'student')));

MY_APP.use('/lecturers', require(PATH.join(ROUTES, 'lecturer', 'lecturer')));

MY_APP.use('/students', require(PATH.join(ROUTES, 'student', 'student')));

// Public static files
MY_APP.use(EXPRESS.static(PUBLIC));
MY_APP.use('/css', EXPRESS.static(PATH.join(PUBLIC, 'css')));
MY_APP.use('/js', EXPRESS.static(PATH.join(PUBLIC, 'js')));
MY_APP.use('/img', EXPRESS.static(PATH.join(PUBLIC, 'img')));
MY_APP.use('/assets', EXPRESS.static(PATH.join(PUBLIC, 'assets')));

// Start server
MY_APP.listen(MY_APP.get('port'), () => {
    console.log('Server automagically working on port : ' + MY_APP.get('port'));
});

MY_APP.get('*', function (req, res) {
    res.redirect('/');
});
