const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  id: { type: String },
  mylist: {
    type: [String],
    default: []
  }
})

module.exports = mongoose.model('User', UserSchema)
