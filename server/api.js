const api = require("express").Router();
const userRoutes = require("./routes/userRoutes");
const skillRoutes = require("./routes/skillRoutes");


api.use('/users', userRoutes);
api.use('/skills', skillRoutes);


module.exports = api;