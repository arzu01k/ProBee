const mongoose = require('mongoose');

module.exports = ()=> {
    mongoose.connect('mongodb://localhost:27017/probeeDB')
    mongoose.connection.on('connected', ()=> {
        console.log('Connected to database')
    })
    mongoose.connection.on('error', (e)=> {
        console.log('Error!', e)
    })
    mongoose.Promise = global.Promise
}