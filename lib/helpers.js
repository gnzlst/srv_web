const BCRYPT = require('bcryptjs');

const HELPERS = {};

HELPERS.encryptPassword = async(password) => {
    const salt = await BCRYPT.genSalt(9);
    const hash = await BCRYPT.hash(password, salt);
    return hash;
};

HELPERS.matchPassword = async(password, savedPassword) => {
    try {
        return await BCRYPT.compare(password, savedPassword);
    } catch (e) {
        console.log(e)
    }
};

module.exports = HELPERS;