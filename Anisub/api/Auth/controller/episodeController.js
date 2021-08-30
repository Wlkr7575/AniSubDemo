import mongoose from 'mongoose'
import Product from '../Schema/Product'
/* eslint-disable no-console */
module.exports.addEpisode = async (req, res) => {
  const { id: _id } = await req.params
  const post = req.body
  console.log(_id)
  if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('nog post with this id') }
  try {
    const addedNewEpisode = await Product.findByIdAndUpdate(_id, { $push: { episode: post } }, { new: true })
    res.status(200).json(addedNewEpisode)
  } catch (error) {
    res.send(error)
    console.log(error)
  }
}
module.exports.fetchEpisodes = async (req, res) => {
  const { id: _id } = await req.params
  console.log(_id)
  if (!mongoose.Types.ObjectId.isValid(_id)) { return res.status(404).send('nog post with this id') }
  const post = await Product.findById(_id, { episode: { episode: 0, comment: 0 } })
  const episodes = await post.episode
  res.status(200).json(episodes)
}
module.exports.getEpisode = async (req, res) => {
  const { id: _id } = await req.params
  const allid = _id.split('&')
  console.log(allid)
  if (!mongoose.Types.ObjectId.isValid(allid[0])) { return res.status(404).send('nog post with this id') }
  const post = await Product.findById(allid[0], { episode: { img: 0 } })
  const episode = post.episode.find((_id) => { return 'hi' })
  const { episode: watch } = episode
  res.status(200).json(watch)
}
module.exports.addComment = async (req, res) => {
  // const { id } = req.params
  const p = req.body
  console.log(p.epid)
  if (!req.userId) { return res.json({ message: 'Unauthenticated' }) }
  if (!mongoose.Types.ObjectId.isValid(p.mainid)) { return res.status(404).send('No post with this id') }
  const post = await Product.updateOne({ _id: p.mainid, 'episode._id': p.epid }, { $push: { 'episode.$.comment': { user: req.userId, comment: p.comment } } })
  res.json({ post })
}
module.exports.fetchComment = async (req, res) => {
  const { id } = req.params
  if (!req.userId) { return res.json({ message: 'Unauthenticated' }) }
  if (!mongoose.Types.ObjectId.isValid(id)) { return res.status(404).send('No post with this id') }
  const posts = await Product.findOne({ 'episode._id': id }).select('episode -_id')
  const post = await posts.episode.filter(p => String(p._id) === String(id))
  const comment = post[0].comment
  res.status(200).json(comment)
}
