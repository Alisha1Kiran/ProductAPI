const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        index:true
    },
    username: String,
    email: String,
    password: String,
    createdAt: Date
});

// productSchema.index({name:1})
module.exports = mongoose.model('users', userSchema)