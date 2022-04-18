const mongoose = require('mongoose');


const publisherSchema = new mongoose.Schema({
 pname : String,
 headQuarter : String,
}, { timestamps : true });

module.exports = mongoose.model('newPublisher', publisherSchema)