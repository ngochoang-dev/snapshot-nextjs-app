const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            // await mongoose.connect('mongodb://localhost:27017/snapshot', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect database successfully!!!')
    } catch (error) {
        console.log('Connect database failed' + error.message);
    }

}


module.exports = { connect };