const express = require('express');
const jwt = require('../utils/jwt');
// const { findUserLogin, getUserById } = require('../models/Users');
const authService = require('../services/authService');

// Define express router to group
const authRouter = express.Router();

authRouter.post('/auth/login', async (req, res) => {
    if(req.body.username && req.body.password) {
        const userLogin = {
            username: req.body.username,
            password: req.body.password
        };
        // Mock User
        // const userLogin = {
        //     username: 'superadmin',
        //     password: 'polke123'
        // };

        authService
            .login(userLogin.username, userLogin.password)
            .then(response => res.status(200).send(response))
            .catch(err => {
                console.log(err);
                res.status(400).send(err.message)
            })
    } else {
        console.error(req.body);
		return res.status(400).send("Invalid Request");
    }
});

authRouter.post('/auth/logout', verifyToken, (req, res) => {
    //
});

authRouter.get('/auth/user-profile', verifyToken, async (req, res) => {
    try {
        const tokenInfo = await jwt.verifyToken(req.token);
        const userData = await getUserById(tokenInfo.id);
        res.json({
            status: 'success',
            message: 'Get User Profile successfully',
            data: userData 
        })
    } catch (err) {
        res.sendStatus(403)
    }
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