const { model, Schema } = require('mongoose');

const productSchema = new Schema ({
    brand: String,
    title: String,
    model: String,
    dateAdded: String
});

module.exports = model('Product', productSchema);