const mongoose = require('mongoose');
const { handleError } = require('vue');

function connect(URI){
    const options = { useNewUrlParser: true, useUnifiedTopology: true};
    mongoose.connect(URI, options, (err) => {
        if(err) handleError(err);
        else console.log('Mongodb connection established');
    });
}

module.exports = connect;