const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Snapshot = new Schema({
    uploaderId: { type: String || Number, required: true },
    category: { type: String, required: true },
    link: { type: String, required: true },
}, {
    timestamps: true,
})


module.exports = mongoose.model('Snapshot', Snapshot);