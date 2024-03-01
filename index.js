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

app.get('/all', async (req, res) =>{
    let data = await Model.find();
    res.send(data);
});

app.post('/create', (req, res) =>{
    let data = new Model(req.body);
    data.save();
    res.send(data);
});

app.patch('/update/:id', async (req, res) =>{  
    console.log(req.params.id);  
    const updateData = req.body;
     let data = await Model.findByIdAndUpdate(req.params.id, updateData);
    res.send(data);
});

app.delete('/delete/:id', async (req, res) =>{
    let deletedItem = await Model.findByIdAndDelete(req.params.id);
    res.send(deletedItem);
});

app.get('/find/:type/:value', async (req, res) =>{
    let entry = await Model.find({
        [req.params.type] : req.params.value
    });
    res.send(entry);
})