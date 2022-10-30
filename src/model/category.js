const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    id: Schema.Types.ObjectId,
    name: String,
    createAt: Date,
});

exports.category = mongoose.model('category', categorySchema);