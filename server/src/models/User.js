const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    age: { type: String, },
    email: { type: String, },
    gender: { type: String, },
    introduction: { type: String, },
    nickname: { type: String, },
    website: { type: String, },
    image: { type: String, },
    username: { type: String, required: true },
    password: { type: String, required: true },
    _id: { type: String, required: true },
}, {
    timestamps: true,
    _id: false,
})


module.exports = mongoose.model('User', User);