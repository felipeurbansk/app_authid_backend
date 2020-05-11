const mongoose = require('mongoose');

const uri_mongo = 'mongodb+srv://admin:Ludovico@cluster0-rzcmf.gcp.mongodb.net/authid?retryWrites=true&w=majority&ssl=true';

mongoose.connect( uri_mongo, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true} );
mongoose.Promise = global.Promise;

module.exports = mongoose;