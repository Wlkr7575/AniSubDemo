const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
  name: { type: String, require: true },
  Age: { type: Number, require: true },
  Source: { type: String, require: true },
  Studio: { type: String, require: true },
  Status: { type: String, require: true },
  Description: { type: String, require: true },
  Duration: { type: String, require: true },
  Format: { type: String, require: true },
  imgUrl: {
    front: { type: String, require: true },
    back: { type: String, require: true }
  },
  startedAt: { type: String, require: true },
  endAt: { type: String, require: true },
  tags: { type: [String], require: true },
  createdAt: { type: Date, default: new Date() },
  likes: {
    type: [String],
    default: []
  },
  episode: [
    {
      img: { type: String, default: '' },
      episode: { type: String, default: '' },
      comment: [{ user: { type: String, default: '' }, comment: { type: String, default: '' } }]
    }
  ]
})

module.exports = mongoose.model('Product', productSchema)
