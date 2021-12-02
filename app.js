require('dotenv').config();
// console.log(require('crypto').randomBytes(64).toString('hex'))
const express = require('express');
const _ = require('lodash');
const morgan = require('morgan');
const pool = require('./connection');
const bcrypt = require('bcrypt');
const authRoutes = require('./routes/authRoutes');

// Express App
const app = express();

// Server Listening
app.listen(process.env.APP_PORT);

// middleware
app.use(express.urlencoded({ extended: true }));
if(process.env.APP_ENV === 'local') {
    app.use(morgan('tiny'));
}

// API Auth Routes
app.use('/api', authRoutes);

// 404 not found
app.use((req, res) => {
    if(res.status(404)) {
        res.json({
            message: 'Not Found',
            code: 404
        });
    }
})