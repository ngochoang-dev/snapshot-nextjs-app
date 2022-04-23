const mongoose = require('mongoose');

async function connect() {
    try {
        // await mongoose.connect('mongodb+srv://ngochoangdev:ngochoangdev@cluster0.qqqo7.mongodb.net/weather_clone?retryWrites=true&w=majority', {
        await mongoose.connect('mongodb://localhost:27017/snapshot', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Connect database successfully!!!')
    } catch (error) {
        console.log('Connect database failed' + error.message);
    }

}


module.exports = { connect };