const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DB_URL;

mongoose.set('strictQuery', false)
function connectToMongoDB() {
    mongoose.connect(DB_URL);

    mongoose.connection.on('connected', () => {
        console.log('Connected to MongoDB successfully');
    });

    mongoose.connection.on('error', (err) => {
        console.log(err);
    })
}

module.exports = {connectToMongoDB}