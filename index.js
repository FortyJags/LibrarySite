require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Model = require(__dirname + '/Model/model.js');
const mongoString = process.env.DATABASE_URL;
const port = 3500;

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (err) =>{
    console.error(err);
});

database.once('connected', (err) =>{
    if(!err){
        console.log('Connected to database');
    }
    else{
        console.error(err);
    }
});

const app = express();

app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/roots/index.html');
});
app.listen(port, () =>{
    console.log('Listening to 3500');
});