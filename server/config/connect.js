const mongoose = require('mongoose') ;

mongoose.connect('mongodb://localhost:27017/chatApp')
        .then(() => console.log('connected to DB')
        )
        .catch((err) => console.log('cannot connect with db', err))


module.exports = mongoose