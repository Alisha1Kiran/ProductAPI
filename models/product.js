const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        index:true
    },
    price: Number,
    image: String,
    description: String
});

// productSchema.index({name:1})
module.exports = mongoose.model('product', productSchema)