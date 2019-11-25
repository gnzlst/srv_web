const CONTROLLER = {};
const PATH = require('path');

CONTROLLER.index = (req, res) => {
    res.locals.metaTags = {
        title: "Login",
        description: "Login"
    };
    res.locals.css = {
        file: "/css/login.css"
    };
    res.render(PATH.join(__dirname, '..', 'views', 'index'), { layout: "main" });
};

module.exports = CONTROLLER;