const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdTimeStamp: {
        type: Date,
        default: Date.now
    },
    updatedTimeStamp: {
        type: Date
    },
    url: {
        type: String
    },
    descr: {
        type: String
    },
    favorite: {
        type: Boolean,
        default: false
    }
})

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;