const express = require('express');
const login = require('./controllers/login');
const signup = require('./controllers/signup');
const verifyUser = require('./controllers/verifyUser');
const update = require('./controllers/updateCredentials');
const authRoutes = express.Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.post("/verifyUser",verifyUser);
authRoutes.post("/update",update);

module.exports = authRoutes