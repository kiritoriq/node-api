const pool = require('../connection');
const bcrypt = require('bcrypt');

async function findUserLogin (username, password) {
    // console.log(username, password);
    const userData = await pool.query(`SELECT * FROM users WHERE username = '${username}'`)
    let data = userData.rows[0]
    let userPass = data.password
    userPass = userPass.replace(/^\$2y(.+)$/i, '$2a$1');
    const compResult = await bcrypt.compare(password, userPass)
    // console.log(compare)
    if(compResult == true) {
        return data
    } else {
        return null
    }
}

module.exports = {
    findUserLogin,
};