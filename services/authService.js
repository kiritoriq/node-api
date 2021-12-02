const userModel = require('../models/Users');
const jwt = require('../utils/jwt');

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        userModel
            .findUserLogin(username, password)
            .then(response => {
                const token = jwt.createToken(response.id, '365 days')
                resolve({
                    status: 'success',
                    message: 'User Logged In',
                    access_token: 'Bearer ' + token,
                    user: response
                })
            })
            .catch(err => {
                reject(err);
            })
    })
}

module.exports = {
    login,
}