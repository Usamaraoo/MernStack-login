 const mongoose = require("mongoose")
 const goalSchema = mongoose.Schema({
     text: {
         type: String,
         required: true
     },
     user: {
         type: mongoose.Schema.Types.ObjectId,
         require: true,
         ref: 'User'
     }
 }, {
     timestamps: true
 })

 module.exports = mongoose.model('Goal', goalSchema)