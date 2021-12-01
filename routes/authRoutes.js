const express = require('express');
const jwt = require('jsonwebtoken');
const { findUserLogin } = require('../models/Users');

// Define express router to group
const authRouter = express.Router();

authRouter.post('/login', async (req, res) => {
    // const userLogin = {
    //     username: req.body.username,
    //     password: req.body.password
    // };
    // Mock User
    const userLogin = {
        username: 'superadmin',
        password: 'polke123'
    };
    
    let userData = await findUserLogin(userLogin.username, userLogin.password)
    if(userData !== undefined) {
        // console.log(userData)
        jwt.sign({userData}, 'secretkey', { expiresIn: '365 days'}, (err, token) => {
            if(err) {
                throw err
            } else {
                res.json({
                    status: 'success',
                    message: 'User Logged In',
                    _token: 'Bearer ' + token,
                    user: userData
                })
            }
        })
    } else {
        console.log('else conds')
    }
});

authRouter.post('/logout', verifyToken, (req, res) => {
    //
});

authRouter.get('/user-profile', verifyToken, (req, res) => {
    const user = jwt.verify(req.token, 'secretkey', (err, authData) => {
        if(err) {
            res.sendStatus(403)
        } else {
            res.json({
                status: 'success',
                message: 'Taking user profile data successfully',
                data: authData
            })
        }
    })
});

// Verify Token Function
function verifyToken(req, res, next) {
    // Get Auth Header Value
    const bearerToken = req.headers['authorization'];
    if(typeof bearerToken !== 'undefined') {
        const token = bearerToken.split(' ')[1];
        req.token = token;
        next();
    } else {
        // Forbidden (403)
        res.sendStatus(403);
    }
}

module.exports = authRouter;