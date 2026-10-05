const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
   
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: value => value > 0,
            message: 'Price must be greater than 0.'
        }
    },
    category: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },


});


module.exports = mongoose.model('Product', productSchema);