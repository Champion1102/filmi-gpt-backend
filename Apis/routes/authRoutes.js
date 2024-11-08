const express = require('express');
const login = require('../controllers/Authentication/login');
const signup = require('../controllers/Authentication/signup');
const verifyUser = require('../controllers/Authentication/verifyUser');
const update = require('../controllers/Authentication/updateCredentials');
const authRoutes = express.Router();

authRoutes.post("/signup",signup);
authRoutes.post("/login",login);
authRoutes.post("/verifyUser",verifyUser);
authRoutes.post("/update",update);

module.exports = authRoutes