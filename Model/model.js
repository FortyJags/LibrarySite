const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    name:{
        require: true,
        type: String
    },
    author:{
        require: true,
        type: String
    },
    amount:{
        require: true,
        type: Number
    }, 
    genre:{
        require: true,
        type: String
    }
});

module.exports = mongoose.model('Books', dataSchema, 'library');
