const express = require('express');
const  bookRoute  = require('./route/book');
const  authorRoute  = require('./route/author');
require('dotenv').config();
const mongoose = require('mongoose');
const morgan = require('morgan');

// setup app to use express functionality
const app = express();
// db connection
mongoose.connect(`mongodb://localhost/${process.env.DB_Name}`,(err=>{
    if(err) throw new Error('can not establish a connection to DB');
    console.log('connection establish successfully');
}));
mongoose.Promise = global.Promise;
// middlwares
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// setip logger middleware
app.use(morgan('dev'));
// setup basic routes for book
app.use('/api',bookRoute)
// setup basic routes for book
app.use('/api',authorRoute)

// handel errors
app.use(function(err,req,res,next){
    res.status(401).json({ Error:err.message });
});

// run the server to listen to requests
app.listen(process.env.port ||3000,()=>{
    console.log('server is running');
});

