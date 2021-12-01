const express = require('express');
const _ = require('lodash');
const morgan = require('morgan');
const pool = require('./connection');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes');

// Express App
const app = express();

// Server Listening
app.listen(3000);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// API Auth Routes
app.use('/api/auth', authRoutes);

// // Home Routes
// app.post('/login', async (req, res) => {
//     // console.log(req.body)
//     const userLogin = {
//         username: req.body.username,
//         password: req.body.password
//     };
//     const user = await pool.query(`SELECT * FROM users WHERE username = '${userLogin.username}'`)
//                 .then((response) => {
//                     let data = response.rows[0];
//                     let password = data.password;
//                     password = password.replace(/^\$2y(.+)$/i, '$2a$1');
//                     let result = "";
//                     bcrypt.compare(userLogin.password, password)
//                         .then((resp) => {
//                             if(resp == true) {
//                                 res.json({
//                                     message: 'Success',
//                                     data: data,
//                                 });
//                             } else {
//                                 res.json({
//                                     message: 'Failed, username and password mismatch!'
//                                 });
//                             }
//                         })
//                         .catch((err) => {
//                             res.json({
//                                 message: 'Error Failed',
//                                 error: err
//                             })
//                         })
//                     pool.end()
//                 })
//     // let randArr = [];
//     // for(let i = 0; i < 5; i++) {
//     //     randArr.push(_.random(0, 99));
//     // }
//     // res.setHeader('Content-Type', 'application/json');
//     // res.end(JSON.stringify(randArr));
// })

// 404 not found
app.use((req, res) => {
    if(res.status(404)) {
        res.json({
            message: 'Not Found',
            code: 404
        });
    }
})