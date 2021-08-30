import mongoose from 'mongoose'
import Product from '../Schema/Product'
/* eslint-disable no-console */
module.exports.add = async (req, res) => {
  const post = req.body
  console.log(req.userId)
  const NewAnime = new Product({ ...post, user: req.userId, createdAt: new Date().toISOString() })
  try {
    await NewAnime.save()
    res.status(200).json(NewAnime)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
module.exports.getPost = async (req, res) => {
  try {
    const post = await Product.find({}, { episode: 0 })
    res.status(200).json(post)
  } catch (error) {
    res.status(404).json({ message: error.message })
  }
}
module.exports.deletePost = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send('no post with this id') }
  await Product.findByIdAndRemove(id)
  res.json({ message: 'Post removed successfully' })
}
module.exports.updatePost = async (req, res) => {
  const { id: _id } = req.params
  const post = req.body
  console.log(post)
  console.log(_id)
  if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send(`no post with this id ${_id}`) }
  const updatedPost = await Product.findByIdAndUpdate(_id, { ...post }, { new: true })
  res.status(200).json(updatedPost)
}
module.exports.likePost = async (req, res) => {
  const { id } = req.params
  if (!req.userId) { return res.json({ message: 'Unauthenticated' }) }
  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send('No post with this id') }
  const post = await Product.findById(id)
  const index = post.likes.findIndex(id => id === String(req.userId))
  if (index === -1) {
    post.likes.push(req.userId)
  } else {
    post.likes = post.likes.filter(id => id !== String(req.userId))
  }
  const updatePost = await Product.findByIdAndUpdate(id, post, { new: true })
  res.json(updatePost)
}
