const mongoose = require('mongoose')

const Access = {
    user: 'Daniel',
    password: 'D@nielet052907'
}

function connectDabase(callBack) {
    mongoose.connect(
        `mongodb+srv://${Access.user}:${Access.password}@instagram-clone-u9pxz.mongodb.net/test?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true
        }
    )
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function () {
        callBack()
    });
}

module.exports = connectDabase
